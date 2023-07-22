"use client";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import {
  useState,
  type FC,
  Fragment,
  type ReactNode,
  type ChangeEvent,
} from "react";

export interface Item {
  readonly value: string | number;
  readonly label: string | number;
}

interface Props {
  readonly items: Item[];
  readonly label?: string;
  readonly placeholder?: string;
  readonly onSelect?: (value: Item) => void;
  readonly defaultValue?: Item;
  readonly className?: string;
  readonly isWidthFull?: boolean;
  readonly isSearchable?: boolean;
  readonly searchPlaceholder?: string;
  readonly popUpClassName?: string;
  /** custom render for anchor and item, usefull for many purposes */
  readonly render?: {
    anchor?: (selected: Item | undefined) => ReactNode;
    item?: (
      item: Item,
      props: { active: boolean; selected: boolean; disabled: boolean }
    ) => ReactNode;
  };
}

const Select: FC<Props> = ({
  items = [],
  label,
  placeholder,
  onSelect,
  defaultValue,
  className,
  isWidthFull = true,
  isSearchable = false,
  searchPlaceholder = "Search",
  popUpClassName,
  render,
}) => {
  const [search, setSearch] = useState("");
  const [localItem, setLocalItem] = useState<Item[]>(items);
  const [selected, setSelected] = useState<Item | undefined>(defaultValue);

  const handleSelect = (value: Item) => {
    if (onSelect) {
      onSelect(value);
    }
    setSelected(value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value) {
      const newItems = items.filter(
        (v) => v.label.toString().toLowerCase().indexOf(value) >= 0
      );
      setLocalItem(newItems);
      setSearch(value);
    } else {
      setSearch("");
      setLocalItem(items);
    }
  };

  return (
    <Listbox value={selected} onChange={handleSelect}>
      {({ open }) => (
        <>
          {label ? (
            <Listbox.Label className="block text-sm font-semibold text-gray-900 mb-2">
              {label}
            </Listbox.Label>
          ) : undefined}

          <div className={clsx("relative", className)}>
            <Listbox.Button className={clsx({ "w-full": isWidthFull })}>
              {render?.anchor ? (
                render.anchor(selected)
              ) : (
                <div className="relative w-full rounded-md bg-white py-3 pl-3 pr-4 text-left text-sm font-medium text-gray-900 border cursor-pointer">
                  <div className="flex flex-row justify-between items-center">
                    {selected ? (
                      <span>{selected.label}</span>
                    ) : (
                      <span>{placeholder}</span>
                    )}

                    <Image
                      src="/icon-up.svg"
                      width={20}
                      height={20}
                      alt="navigation"
                      className={clsx(
                        { "rotate-180": !open },
                        "transition-transform"
                      )}
                    />
                  </div>
                </div>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              enter="transition ease-in duration-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={clsx(
                  "absolute z-10 mt-1 max-h-56 overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                  { "w-full": isWidthFull },
                  popUpClassName
                )}
              >
                {isSearchable ? (
                  <li className="px-2 py-1 relative text-sm font-medium">
                    <Image
                      className="absolute top-1/2 transform -translate-y-1/2 left-5"
                      src="/icon-search.svg"
                      width={20}
                      height={20}
                      alt="search icon"
                    />
                    <input
                      value={search}
                      onChange={handleSearch}
                      placeholder={searchPlaceholder}
                      type="text"
                      onKeyDown={(e) => {
                        if (e.code === "Space") {
                          e.stopPropagation();
                        }
                      }}
                      className="w-full focus-visible:outline-none border rounded-md py-2 pl-10 pr-2"
                    />
                  </li>
                ) : undefined}

                {localItem.map((item) => (
                  <Listbox.Option key={item.value} value={item}>
                    {(props) =>
                      render?.item ? (
                        (render.item(item, props) as any)
                      ) : (
                        <div
                          className={clsx(
                            "flex items-center relative cursor-default select-none py-2 px-3",
                            {
                              "bg-gray-200 text-black": props.active,
                              "text-gray-900": !props.active,
                            }
                          )}
                        >
                          <span
                            className={clsx(
                              {
                                "font-semibold": props.selected,
                                "font-normal": !props.selected,
                              },
                              "block truncate"
                            )}
                          >
                            {item.label}
                          </span>
                        </div>
                      )
                    }
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
