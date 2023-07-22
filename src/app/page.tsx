import Box from "@/components/Box";
import Button from "@/components/Button";

import Select from "@/components/Select";
import Upload from "@/components/Upload";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-auto flex-col items-center justify-center bg-background gap-4">
      <Box className="p-4">
        <div className="flex flex-row gap-4 items-start">
          <div className="bg-gray-100 p-3.5 rounded-full">
            <Image
              src="/icon-google.svg"
              width={20}
              height={20}
              alt="google icon"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-medium tracking-wide">
              Connect Google Account
            </h1>
            <p className="text-sm text-gray-500 tracking-normal">
              Please connect Google Account to use this block
            </p>
          </div>
        </div>
        <Button className="mt-4">Connect</Button>
      </Box>

      <Box>
        <button className="w-full bg-gray-100 p-2.5 text-sm rounded-full flex flex-row justify-center items-center gap-2 text-gray-700 font-medium hover:brightness-95">
          <Image
            src="/icon-database.svg"
            alt="database icon"
            width={20}
            height={20}
          />
          <span className="tracking-wide">
            Connect Flow Node to Import to Google Sheets
          </span>
        </button>
      </Box>

      <Box>
        <Select
          items={[{ label: "My Account", value: 1 }]}
          label="Google Account"
          placeholder="Account Name"
          className="mb-3"
        />
        <Upload />
        <Button disabled className="w-full mt-4 h-11">
          Export
        </Button>
      </Box>
    </main>
  );
}
