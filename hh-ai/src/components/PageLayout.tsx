import styled from "@emotion/styled";
import {Button, Flex, Typography} from "antd";
import {useUnit} from "effector-react";
import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import {HEADER_HEIGHT} from "../constants";
import * as userModel from "../model/user";
import * as userModule from "../model/user";

const StyledHeader = styled.header`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.07);
    height: ${HEADER_HEIGHT}px;
    box-sizing: border-box;
    width: 100%;
    z-index: 10;
`

const StyledChildren = styled.div`
    padding-top: ${HEADER_HEIGHT}px;
    position: absolute;
    z-index: 1;
    width: 100%;
`

const Header = () => {
    const navigate = useNavigate()
    const [isAuth, userInfo, logoutButtonClicked] = useUnit([userModel.$isAuth, userModel.$userInfo, userModel.logoutButtonClicked])

    return <StyledHeader>
        <Button onClick={() => {
            navigate("/")
        }}>Home</Button>
        <Flex gap={10} justify={"end"} align={"baseline"} style={{width: '100%'}}>
            {isAuth ?
                <>
                    {userInfo &&
                        <Typography.Text>
                            <a href={"/profile"}>
                                {userInfo.firstName?.toUpperCase()} {userInfo.lastName?.toUpperCase()}
                            </a>
                        </Typography.Text>
                    }
                    <Button onClick={() => {
                        logoutButtonClicked()
                    }}>Logout</Button>
                </>
                :
                <>
                    <Button onClick={() => {
                        navigate("/login")
                    }}>Login</Button>
                    <Button onClick={() => {
                        navigate("/register")
                    }}>Sing up</Button>
                </>
            }
        </Flex>
    </StyledHeader>
}

type PageLayoutProps = { children: React.ReactNode }


const authOnlyPaths = ["/profile"]

const PageLayout = ({children}: PageLayoutProps) => {
    const [isAuth, isLoading] = useUnit([userModule.$isAuth, userModule.$isLoading])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (authOnlyPaths.includes(location.pathname) && !isAuth && !isLoading) {
            navigate("/")
        }
    }, [location]);

    return <div>
        <Header/>
        <StyledChildren>{children}</StyledChildren>
    </div>
}

export default PageLayout