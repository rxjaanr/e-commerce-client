import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";

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
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const icon = {
    true: <EyeSlashIcon className="w-6" />,
    false: <EyeIcon className="w-6" />,
  };

  return (
    <>
      <div className="flex flex-col relative">
        <label className="capitalize">{label}</label>
        <input
          className="p-2 px-4 border border-slate-300 focus:outline-none rounded-sm mt-1"
          type={
            type === "password" && !hiddenPassword ? "text" : type ?? "text"
          }
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {children}
        {type === "password" && value !== "" && (
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={() => setHiddenPassword((hidden) => !hidden)}
          >
            {icon[`${hiddenPassword}`]}
          </span>
        )}
      </div>
    </>
  );
}
