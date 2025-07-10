function validateEmail(email: string): boolean {
    if (!email.length) {
        return true;
    }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


export {
    validateEmail
}