import { getTranslations } from "@app/i18n";
import { AllowTranslation, RequiredTranslationDict } from "@app/i18n/api/types";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

type TranslationValue = {
    translationsLang: AllowTranslation,
    translations: RequiredTranslationDict;
}

const TranslationsContext = React.createContext<Partial<TranslationValue>>({});

function TranslationsContextProvider({
    children
}: PropsWithChildren) {
    const [translationsLang, setTranslationsLang] = useState<AllowTranslation>('ru');
    const [translations, setTranslations] = useState<RequiredTranslationDict>(getTranslations(translationsLang));

    useEffect(() => {
        setTranslations(getTranslations(translationsLang))
    }, [translationsLang])

    return (
        <TranslationsContext.Provider value={useMemo(() => ({
            translations,
            translationsLang
        }), [translations, translationsLang]
        )}>
            {children}
        </TranslationsContext.Provider>
    )
}

function useTranslations() {
    return React.useContext(TranslationsContext)
}

export {
    TranslationsContextProvider,
    useTranslations
}

export {
    TranslationsContext
}