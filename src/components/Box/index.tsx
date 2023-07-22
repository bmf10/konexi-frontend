import clsx from "clsx";
import Image from "next/image";
import type { FC, ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
  readonly header?: ReactNode; // Custom header
  readonly className?: string;
  readonly parentClassName?: string;
  readonly onDelete?: () => void;
}

const Box: FC<Props> = ({
  children,
  header,
  className,
  parentClassName,
  onDelete,
}) => {
  return (
    <div
      className={clsx(
        `p-5 border border-gray-300 rounded-xl bg-white w-[485px]`,
        parentClassName
      )}
    >
      {header ? (
        header
      ) : (
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row justify-start gap-3 items-center">
            <div className="p-2 bg-green-100 w-9 h-9 rounded-md flex justify-center items-center">
              <Image
                src="/google-sheet.svg"
                alt="google sheet logo"
                width={16}
                height={16}
              />
            </div>
            <h1 className="font-semibold tracking-wide">
              Export to Google Sheets
            </h1>
          </div>
          <button
            className="bg-gray-100 p-2 rounded-md hover:brightness-95"
            onClick={onDelete}
          >
            <Image
              src="/icon-delete.svg"
              alt="delete icon"
              width={16}
              height={16}
            />
          </button>
        </div>
      )}
      <div className={className}>{children}</div>
    </div>
  );
};

export default Box;
