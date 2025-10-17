import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import SideBar from "@repo/ui/sidebar";
import NavBar from "../../components/navbar";

export default function RootLayouttttt({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen bg-black">
      {/* <SideBar /> */}
      <div className="m-3 flex h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] flex-col items-center justify-between rounded-xl border border-neutral-800">
        <NavBar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-b-xl">
          <main className="h-full w-full flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
