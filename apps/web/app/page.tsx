"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import AddTrigger from "../components/add-trigger";
import TriggerBtn from "../components/trigger-btn";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen bg-[#000000]">
      <div className="m-3 flex w-screen flex-col items-center justify-between rounded-xl border border-[#292929]">
        <Navbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-b-xl">
          <TriggerBtn size="large" isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen ? <AddTrigger onClose={() => setIsOpen(false)} /> : ""}
        </div>
      </div>
    </div>
  );
}
