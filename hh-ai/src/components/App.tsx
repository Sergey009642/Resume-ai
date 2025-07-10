import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import RegistrationPage from "../pages/RegistrationPage";
import PageNotFound from '../pages/PageNotFound';
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import PageLayout from "./PageLayout";
import ProfilePage from "../pages/ProfilePage";
import * as userModule from '../model/user';
import {useUnit} from 'effector-react';
import {HomePage} from "../pages/HomePage";

const routes = [
    {
        path: "/",
        Component: HomePage
    },
    {
        path: "/generate",
        Component: MainPage
    },
    {
        path: "/register",
        Component: RegistrationPage
    },
    {
        path: "/login",
        Component: LoginPage
    },
    {
        path: "/profile",
        Component: ProfilePage
    }
]

const App: React.FC = () => {
    const [isAuth, userInfo, userInfoRequested, checkAuthFx] = useUnit([userModule.$isAuth, userModule.$userInfo, userModule.userInfoRequested, userModule.checkAuthFx])

    useEffect(() => {
        void checkAuthFx();
    }, [checkAuthFx]);

    useEffect(() => {
        if (!userInfo && isAuth) {
            userInfoRequested()
        }
    }, [isAuth, userInfo, userInfoRequested]);

    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => {
                    const {Component} = route;

                    return <Route path={route.path} element={<PageLayout><Component/></PageLayout>}/>
                })}
                <Route
                    path="*"
                    element={<PageNotFound/>}
                />
            </Routes>
        </BrowserRouter>
    );
};


export default App;
