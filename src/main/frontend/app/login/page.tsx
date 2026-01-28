"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import { EmailCheckForm } from "@/components/login/forms/email-check";
import { RegisterForm } from "@/components/login/forms/register";
import { SignInForm } from "@/components/login/forms/sign-in";

export enum StepState {
  EMAIL_CHECK = "email-check",
  REGISTER = "register",
  SIGN_IN = "sign-in",
}

export interface FormProps {
  formData: { [k: string]: FormDataEntryValue };
  setFormData: (data: { [k: string]: FormDataEntryValue }) => void;
  setStep: (step: StepState) => void;
}

const renderForm = (step: StepState, props: FormProps) => {
  const formMap = {
    [StepState.EMAIL_CHECK]: <EmailCheckForm {...props} />,
    [StepState.REGISTER]: <RegisterForm {...props} />,
    [StepState.SIGN_IN]: <SignInForm {...props} />,
  };
  return formMap[step];
};

export default function Login() {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState<StepState>(StepState.EMAIL_CHECK);

  return (
    <div className="flex flex-col justify-center items-center w-full h-auto bg-[url(/retro-games-hero.jpg)] bg-cover bg-center">
      <div className="flex flex-col p-8 m-8 bg-zinc-50 rounded-2xl drop-shadow-lg gap-8">
        <h1 className="text-xl">Join the Retro Store community</h1>
        <Divider />
        {renderForm(step, { formData, setFormData, setStep })}
      </div>
    </div>
  );
}
