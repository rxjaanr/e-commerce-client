import clsx from "clsx";

type PropsType = {
  name: string;
  inputType: "text" | "password" | "email";
  onChange?: (e?: any) => void;
  value?: string | any;
  placeholder: string;
  className?: string;
};

export default function FormControl(props: PropsType) {
  return (
    <>
      <input
        name={props.name}
        type={props.inputType ?? "text"}
        className={clsx(
          "px-6 py-4 w-full rounded-md focus:outline border border-slate-300 ",
          props.className
        )}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        autoComplete="off"
      />
    </>
  );
}
