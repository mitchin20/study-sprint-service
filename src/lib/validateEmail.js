const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        return {
            isValid: true,
            message: "Email is valid"
        }
    } else {
        return {
            isValid: false,
            message: "Email is not valid"
        }
    }
}

module.exports = {
    validateEmail,
}