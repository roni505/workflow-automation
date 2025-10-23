"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import AddTrigger from "../components/add-trigger";
import TriggerBtn from "../components/trigger-btn";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen w-screen bg-[#000000]">
      <div className="m-3 flex w-screen flex-col items-center justify-between rounded-xl border border-[#292929]">
        <Navbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-b-xl">
          <TriggerBtn size="large" isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen ? <AddTrigger /> : ""}
        </div>
      </div>
    </div>
  );
}
