import { useState } from "react";

export function useForm<T>(initialState: T) {
   const [formData, setFormData] = useState(initialState);

   const handleChange = (key: keyof T, value: any) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
   };

   const resetForm = () => setFormData(initialState);

   return { formData, handleChange, resetForm };
}