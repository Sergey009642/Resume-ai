import React from "react";

import styled from "@emotion/styled";
import {HEADER_HEIGHT} from "../constants";


const StyledPageLayout = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    min-height: calc(100vh - ${HEADER_HEIGHT}px);
    gap: 2rem;
    
    @media (min-width: 1280px) {
        grid-template-columns: 1fr 1fr;
        gap: 0;
    }
`



type PageLayoutProps = {children: React.ReactNode}

const MainPageLayout:React.FC<PageLayoutProps> =    ({children}) => {
    return <StyledPageLayout>
        {children}
    </StyledPageLayout>
}
export default MainPageLayout;