"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ placeholder = "Search services..." }) {
  return (
    <div className="max-w-2xl mx-auto my-8 flex">
      <Input
        type="text"
        placeholder={placeholder}
        className="rounded-r-none flex-grow p-5"
      />
      <Button className="rounded-l-none bg-blue-600" size="lg">
        Search
      </Button>
    </div>
  );
}
