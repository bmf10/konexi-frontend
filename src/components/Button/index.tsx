import clsx from "clsx";
import type { FC, ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
  readonly className?: string;
  readonly disabled?: boolean;
}

const Button: FC<Props> = ({ children, className, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "text-sm font-medium tracking-wide text-white bg-google-blue py-2 px-3.5 rounded-md hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
