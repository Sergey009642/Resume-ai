import fieldsMatcher from ".";

export type Fields = keyof typeof fieldsMatcher

export type RemoveEvent = (fieldName: Fields) => void