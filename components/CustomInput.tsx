import React from "react";
import { UserType } from "./Profile";
import { FieldError, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  id: "name" | "lastname" | "email";
  placeholder: string;
  register: UseFormRegister<UserType>;
  error?: FieldError;
  disabled?: boolean;
}

export default function CustomInput({
  id,
  placeholder,
  register,
  error,
  disabled = false,
}: CustomInputProps) {
  return (
    <div className="relative w-full md:w-[60%]">
      <input
        type="text"
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        {...register(id)}
        className={`border p-4 w-full text-sm rounded-lg  outline-0  containers transition-all duration-150 ease-in-out ${
          error ? "border-red-600" : "focus:border-[#633cff] border-zinc-500"
        }`}
      ></input>
      {error && (
        <p className="text-[0.7rem] text-red-500 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-4">
          {error.message}
        </p>
      )}
    </div>
  );
}
