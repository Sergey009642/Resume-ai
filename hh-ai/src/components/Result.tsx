import styled from "@emotion/styled";
import React from "react";
import {HEADER_HEIGHT} from "../constants";

const StyledResultContainer = styled.div`
    padding: 3vh 3vw;
    height: calc(94vh - ${HEADER_HEIGHT}px);
`
const StyledResultContent = styled.div`
    height: 100%; 
    width: 100%; 
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    border-radius: 10px;
    
    @media (min-width: 1280px) {
        position: fixed;
        height: calc(94vh - ${HEADER_HEIGHT}px);
        width: 44vw;
    }
`

const Result: React.FC<{value?: string}> = ({value}) => {
    return <StyledResultContainer><StyledResultContent dangerouslySetInnerHTML={{__html: value || ""}}></StyledResultContent></StyledResultContainer>
}

export default Result