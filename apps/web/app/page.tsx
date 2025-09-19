"use client";

import { useState, useCallback } from "react";
import { Btn } from "@repo/ui/button";
import { Plus } from "lucide-react";
import SideBar from "@repo/ui/sidebar";
import TriggerBtn from "@repo/ui/TriggerBtn";
import Navbar from "@repo/ui/navbar";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-[#ffffff]">
      <SideBar />
      <div className="m-3 flex w-full flex-col items-center justify-between rounded-xl border border-[#e9e9e9]">
        <Navbar />
        <div className="flex h-full w-full items-center justify-center rounded-b-xl bg-[#ffffff]">
          <TriggerBtn />
        </div>
      </div>
    </div>
  );
}
