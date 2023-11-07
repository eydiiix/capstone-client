export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// In email test ...
// ...it checks for the presence of an "@" symbol.
// ...it enforces character rules for the username and domain parts.
// ...it specifies the minimum and maximum length for the TLD.

export const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};~':"\\|,.<>/?]).*$/;

// In password test ...
// ...it must contain at least one uppercase letter.
// ...it must contain at least one digit.
// ...it must contain at least one special character from the specified set.
// ...it can contain any other characters after satisfying the above conditions.
    