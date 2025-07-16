function validateName(name: string) {
    if (!name.length) {
        return true
    }

    if (name.length < 2) {
        return false;
    }
    if (name.length > 30) {
        return false;
    }
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
        return false;
    }
    return true;
}

export {
    validateName
};