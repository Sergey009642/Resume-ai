type AllowTranslation = 'ru' | 'en';

type RequiredTranslationDict = {
    HEADING: {
        HOME: () => string,
        PORTFOLIO: () => string,
    },
    MAIN_PAGE: {
        SKILLS_PROGRAMMING: () => string,
        SKILLS_LANGUAGE: () => string,
        REALISED: () => string,
        PROJECTS: () => string,
        YEARS_OF: () => string,
        TITLE1: () => string,
        TITLE2: () => string,
        TECHNOLOGY: () => string[],
        TEAM_TITLE: () => string,
        TEAM_SUBTITLE: () => string,
        INTRODUCTION_TITLE: () => string,
        INTRODUCTION_SUBTITLE: () => string,
        WHY_CHOOSE_US: () => string,
        ABOUT_US: () => string,
        HELLO: () => string,
        TEAM_ABOUT: () => string,
        TEAM_DESCRIPTION: () => string,
        ACCHIEVMENT_1: () => string,
        ACCHIEVMENT_2: () => string,
        ACCHIEVMENT_3: () => string,
        ACCHIEVMENT_4: () =>  string,
        OUR_WORKS_TITLE: () => string,
        OUR_WORKS_SUBTITLE: () => string,
        CONTACT_US_TITLE: () => string,
        CONTACT_US_SUBTITLE: () => string,
        SEND_MESSAGE_BUTTON: () => string,
        YOUR_NAME: () => string,
        YOUR_EMAIL: () => string,
        YOUR_MESSAGE: () => string,
        MINTY_TITLE: () => string,
        MINTY_DESCRIPTION: () => string,
        SHELTER_TITLE: () => string,
        SHELTER_DESCRIPTION: () => string,
    }
}

export type {
    AllowTranslation,
    RequiredTranslationDict
}