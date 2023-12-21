import { ReactNode } from "react";

type PropsType = {
  label?: string;
  type?: "text" | "password" | "email";
  onChange?: any;
  value?: string | number;
  placeholder?: string;
  children?: ReactNode;
};

export default function Input({
  label,
  type,
  onChange,
  value,
  placeholder,
  children,
}: PropsType) {
  return (
    <>
      <div className="flex flex-col">
        <label className="capitalize">{label}</label>
        <input
          className="p-2 px-4 border border-slate-300 focus:outline-none rounded-sm mt-1"
          type={type ?? "text"}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {children}
      </div>
    </>
  );
}
