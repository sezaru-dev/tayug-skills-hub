'use client'

import React, { forwardRef } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

const AddProjectCardButtonLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(({ href, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      {...props}
      className="
        group relative border-2 border-dashed border-gray-300
        rounded-xl h-full min-h-[220px] w-full
        flex flex-col items-center justify-center
        bg-white hover:bg-gray-50
        transition-all duration-200
        hover:border-gray-400
        active:scale-[0.98]
      "
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 transition">
        <Plus className="w-5 h-5 text-gray-600" />
      </div>

      <p className="mt-3 text-sm font-medium text-gray-700">
        Add New Project
      </p>

      <p className="text-xs text-gray-400">
        Click to create a new project
      </p>
    </Link>
  );
});

AddProjectCardButtonLink.displayName = "AddProjectCardButtonLink";

export default AddProjectCardButtonLink;