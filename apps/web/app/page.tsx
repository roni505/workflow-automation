"use client";

import "@xyflow/react/dist/style.css";
import { useState } from "react";
import TriggerBtn from "@repo/ui/TriggerBtn";
import Navbar from "../components/navbar";
import AddTrigger from "@repo/ui/add-trigger";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen w-screen bg-[#ffffff]">
      {/* <SideBar /> */}
      <div className="m-3 flex w-screen flex-col items-center justify-between rounded-xl border border-[#e9e9e9]">
        <Navbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-b-xl bg-[#ffffff]">
          <TriggerBtn isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen ? <AddTrigger /> : ""}
        </div>
      </div>
    </div>
    // />
  );
}
