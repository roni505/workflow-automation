"use client";

import {
  Codesandbox,
  Icon,
  icons,
  Layers2,
  LayoutDashboard,
  PanelLeft,
  User,
  Zap,
} from "lucide-react";
import { FolderOpen } from "lucide-react";
import { useState } from "react";

// interface Links {
//   icon;
// }

const links = [
  {
    icons: LayoutDashboard,
    name: "Dashboard",
    href: "......",
  },
  {
    icons: FolderOpen,
    name: "My projects",
    href: "......",
  },
  {
    icons: User,
    name: "Personal",
    href: "......",
  },
  {
    icons: Layers2,
    name: "Templates",
    href: "......",
  },
];

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${!isOpen ? "w-3xs" : "w-20"} flex h-screen flex-col rounded-r-2xl bg-white px-4 py-6 text-black duration-300`}
    >
      <div className="mb-7 ml-3.5 flex items-center justify-between text-3xl">
        <div className="flex items-center justify-center gap-2">
          {!isOpen ? "LOGO" : ""}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded-[8px] p-1 hover:bg-neutral-200"
        >
          <PanelLeft size={20} color="grey" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {links.map((link) => {
          return (
            <SidebarBtn
              key={Math.random()}
              text={!isOpen ? link.name : ""}
              icon={link.icons}
            />
          );
        })}
      </div>
    </div>
  );
}

const SidebarBtn = ({
  text,
  icon: Icon,
}: {
  text: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[12px] px-4 py-2 hover:bg-neutral-200">
      <Icon size={18} />
      {text}
    </div>
  );
};
