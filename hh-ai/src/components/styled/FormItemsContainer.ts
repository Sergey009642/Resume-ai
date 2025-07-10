import styled from "@emotion/styled";

export const StyledFormItemsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 2vw;
    align-items: center;

    > * {
        align-self: center;
    }

    @media (max-width: 1200px) {
        grid-template-columns: 1fr; /* Одна колонка на экранах шириной до 1200px */
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr; /* Одна колонка на экранах шириной до 768px */
        gap: 20px; /* Увеличим отступы для мобильных */
    }
`;