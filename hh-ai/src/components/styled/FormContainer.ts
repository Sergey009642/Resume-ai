import styled from "@emotion/styled";

export const StyledFormContainer = styled.div`
    padding: 3vw;
    position: relative;

    @media (max-width: 1200px) {
        padding: 2vw; /* Уменьшаем отступы на экранах до 1200px */
    }

    @media (max-width: 768px) {
        padding: 1vw; /* Еще меньше отступов на мобильных устройствах */
    }
`;