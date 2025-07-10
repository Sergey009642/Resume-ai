import { AllowTranslation } from "./api/types";

import {ru} from './lib/ru'

function getTranslations<T>(lang: AllowTranslation): T {
    if (lang === 'ru') {
        return ru as T
    } else {
        return ru as T // TODO: add other languages
    }
}

export {
    getTranslations
}