import clsx from "clsx";

type PropsType = {
  name?: string;
  placeholder: string;
  value?: string;
  cols?: number;
  row?: number;
  className?: string;
  onChange?: (e: any) => any;
};
export default function TextArea(props: PropsType) {
  return (
    <>
      <textarea
        className={clsx(
          "border border-slate-200 shadow-sm px-6 py-4",
          props.className
        )}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        cols={props.cols ?? 30}
        rows={props.row ?? 10}
      >
        {props.value}
      </textarea>
    </>
  );
}
