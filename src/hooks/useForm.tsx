import { useState } from "react";

interface FormState {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
}

export const useForm = (): [FormState, React.Dispatch<React.SetStateAction<FormState>>] => {
  const [form, setForm] = useState<FormState>({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
  });

  return [form, setForm];
};