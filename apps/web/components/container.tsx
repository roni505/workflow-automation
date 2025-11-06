"use client";

import React from "react";
import { motion } from "motion/react";
import { Square } from "lucide-react";

type ContainerPropsType = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: ContainerPropsType) {
  return (
    <motion.div
      className={`border border-dashed border-neutral-800 bg-black p-2`}
    >
      <div
        //   divide-y divide-neutral-800
        className={`${className} w-md relative border border-neutral-800`}
      >
        <Square size={8} className="absolute -right-2 -top-2 bg-neutral-600" />
        <Square size={8} className="absolute -left-2 -top-2 bg-neutral-600" />
        <Square
          size={8}
          className="absolute -bottom-2 -right-2 bg-neutral-600"
        />
        <Square
          size={8}
          className="absolute -bottom-2 -left-2 bg-neutral-600"
        />
        {children}
      </div>
    </motion.div>
  );
}

export default Container;
