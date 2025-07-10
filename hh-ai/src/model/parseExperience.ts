import {createDomain, createEffect, sample} from "effector";
import {userInfo} from "../api/userInfo";
import {authController} from "../controllers/auth";
import {UserInfo} from "../types/userInfo";
import {parseExperience, ParseExperienceInput, parsePdfExperience, ParsePdfExperienceInput} from "../api/resume";
import {$resumeHtmlContent, fetchResumeByIdFx} from "./resume";

const domain = createDomain("user")

export type ParsedExperienceFields =  Record<string, string>

export const parseExperienceClicked = domain.createEvent<ParseExperienceInput>()
export const parsePdfExperienceClicked = domain.createEvent<ParsePdfExperienceInput>()

export const parseExperienceFx = domain.createEffect(parseExperience)
export const parsePdfExperienceFx = domain.createEffect(parsePdfExperience)

export const $isLoadingParseExperience = parseExperienceFx.pending
export const $isParseExperienceFinished =  domain.createStore<Boolean>(false)
    .on(parseExperienceFx.finally, () => true)

export const $parsedExperienceFields = domain.createStore<ParsedExperienceFields>({})

sample({
    clock: [parseExperienceFx.done, parsePdfExperienceFx.done],
    fn: ({result}) => {
        return result
    },
    target: $parsedExperienceFields,
})

sample({
    clock: parseExperienceClicked,
    target: parseExperienceFx
})

sample({
    clock: parsePdfExperienceClicked,
    target: parsePdfExperienceFx
})



