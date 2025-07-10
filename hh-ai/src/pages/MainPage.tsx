import React, {useEffect, useState} from "react";
import MainPageLayout from "../components/MainPageLayout";
import MainForm from "../components/MainForm";
import Result from "../components/Result";
import {useUnit} from "effector-react";
import * as resumeModel from "../model/resume";

const MainPage = () => {
    const [resumeInstance] = useUnit([resumeModel.$resume])
    const [result, setResult] = useState("");

    useEffect(() => {
        if (!result) {
            setResult(resumeInstance?.htmlContent || "")
        }
    }, [resumeInstance?.htmlContent]);

    return <MainPageLayout>
        <MainForm setResult={setResult}/>
        <Result value={result}/>
    </MainPageLayout>
}

export default MainPage;
