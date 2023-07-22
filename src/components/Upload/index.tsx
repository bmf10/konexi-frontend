"use client";
import Image from "next/image";
import { type FC, useState, type ChangeEvent } from "react";
import Select, { type Item } from "../Select";
import clsx from "clsx";

interface Props {
  readonly onSelect?: (item: Item) => void;
  readonly onFileSelect?: (file?: File | null) => void;
}

const Upload: FC<Props> = ({ onFileSelect, onSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (onFileSelect) {
      onFileSelect(e.target.files?.item(0));
    }
    setSelectedFile(e.target.files?.item(0));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        File
      </label>
      <div className="w-full rounded-md bg-white py-1 px-4 text-left text-sm font-medium text-gray-900 border flex flex-row justify-between items-center">
        <div className="relative flex flex-row items-center gap-3 w-full">
          <Image
            src="/google-sheet.svg"
            alt="google sheet logo"
            width={20}
            height={20}
          />
          <span className="line-clamp-1">{selectedFile?.name}</span>
          <input
            type="file"
            className="absolute w-full h-full top-0 left-0 opacity-0"
            onChange={handleFileSelect}
            multiple={false}
          />
        </div>

        <div className="flex flex-row min-w-max gap-2">
          <Select
            defaultValue={{ label: "Tab 1", value: 1 }}
            render={{
              anchor: (item) => (
                <div className="rounded-full bg-slate-100 py-2 px-3.5 text-xs text-gray-500">
                  {item?.label}
                </div>
              ),
              item: (item, props) => (
                <div
                  className={clsx(
                    "flex items-center relative cursor-default select-none py-2 px-3 justify-between",
                    {
                      "bg-gray-100 text-black": props.active,
                      "text-gray-900": !props.active,
                    }
                  )}
                >
                  <span className="block truncate font-normal">
                    {item.label}
                  </span>
                  {props.selected ? (
                    <Image
                      src="/icon-check.svg"
                      width={16}
                      height={16}
                      alt="check"
                    />
                  ) : undefined}
                </div>
              ),
            }}
            popUpClassName="w-40 mt-6"
            isSearchable
            items={[
              { label: "Tab 1", value: 1 },
              { label: "Tab 2", value: 2 },
              { label: "Tab 3", value: 3 },
            ]}
            isWidthFull={false}
            onSelect={onSelect}
          />

          <button onClick={() => setSelectedFile(undefined)}>
            <Image src="/icon-close.svg" width={20} height={20} alt="remove" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
