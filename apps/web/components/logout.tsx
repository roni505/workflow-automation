"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 transition hover:opacity-80"
    >
      <LogOut size={22} color="#A10000" strokeWidth={2} />
    </button>
  );
}

export default Logout;
