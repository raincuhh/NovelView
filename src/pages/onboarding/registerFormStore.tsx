import { create } from "zustand";
import { z } from "zod";

export const baseRegisterFormSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(10, "Password must be at least 10 characters"),
	repeatPassword: z.string().min(10, "Password must be at least 10 characters"),
	gender: z.enum(["male", "female", "nonBinary", "other", "preferNotToSay"]).nullable(),
	DOB: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
		.nullable(),
	username: z.string().min(2, "Username must be at least 2 characters"),
});

export const registerFormSchema = baseRegisterFormSchema.refine(
	(data) => data.password === data.repeatPassword,
	{
		message: "Passwords do not match",
		path: ["repeatPassword"],
	}
);

export type RegisterFormData = z.infer<typeof registerFormSchema>;

type RegisterFormState = {
	formData: RegisterFormData;
	updateField: (data: Partial<RegisterFormData>) => void;
	resetForm: () => void;
};

export const useRegisterFormStore = create<RegisterFormState>((set) => ({
	formData: {
		email: "",
		password: "",
		repeatPassword: "",
		gender: null,
		DOB: null,
		username: "",
	},
	updateField: (field) => {
		set((state) => ({
			formData: { ...state.formData, ...field },
		}));

		console.log();
	},
	resetForm: () =>
		set(() => ({
			formData: {
				email: "",
				password: "",
				repeatPassword: "",
				gender: null,
				DOB: null,
				username: "",
			},
		})),
}));
