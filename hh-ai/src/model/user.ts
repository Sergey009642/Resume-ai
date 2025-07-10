import {createDomain, createEffect, sample} from "effector";
import {userInfo} from "../api/userInfo";
import {authController} from "../controllers/auth";
import {UserInfo} from "../types/userInfo";

const domain = createDomain("user")

export const loginProceed = domain.createEvent()

export const logoutButtonClicked = domain.createEvent()

export const userInfoRequested = domain.createEvent()

export const fetchUserInfoFx = domain.createEffect(userInfo)

export const checkAuthFx = createEffect(() => {
    return authController.checkToken();
});

export const $isAuth = domain.store(false)
    .on(loginProceed, () => true)
    .on(logoutButtonClicked, () => {
        authController.clearTokens();
        return false;
    })
    .on(checkAuthFx.done, (_, {result}) => {
        return result;
    })

export const $isLoading = domain.store(true)
    .on(fetchUserInfoFx.done, (_, {result}) => !result);

export const $userInfo = domain.store<UserInfo | null>(null)
    .on(fetchUserInfoFx.done, (state, {result}) => {
        if (result) {
            return {
                email: result.email,
                lastName: result.last_name,
                firstName: result.first_name,
                middleName: result.middle_name,
                id: result.id,
                about: result.about,
                phone: result.phone
            } as UserInfo
        }
        return state
    })
    .reset(logoutButtonClicked)

sample({
    clock: userInfoRequested,
    target: fetchUserInfoFx,
})