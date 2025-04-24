export const isValidEmail = (email: string): boolean => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isStrongPassword = (password: string): boolean => {
	return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

export const formatAuthError = (error: any): string => {
	if (!error) return "An unknown error occurred.";
	if (error.message) return error.message;
	return "Authentication failed. Please try again.";
};

export const sanitizeInput = (input: string): string => {
	return input.replace(/[<>]/g, "");
};
