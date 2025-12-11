"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import {
  Card,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ServiceProviderCardProps = {
  id: string;
  name: string;
  avatarUrl: string;
  skills: string[]; // now an array
  location: string;
  onViewProfile?: (id: string) => void;
};

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  id,
  name,
  avatarUrl,
  skills,
  location,
  onViewProfile,
}) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkToggle = () => setBookmarked((prev) => !prev);
  const handleViewProfile = () => onViewProfile?.(id);

  return (
    <Card className="relative flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-transform transform rounded-lg">
      {/* Bookmark Toggle */}
      <button
        onClick={handleBookmarkToggle}
        className="absolute top-3 right-3 bg-white dark:bg-gray-700 rounded-full p-2 hover:scale-110 transition-transform"
      >
        <Bookmark
          className={`w-5 h-5 transition-colors ${
            bookmarked ? "text-blue-600 fill-current" : "text-gray-400"
          }`}
        />
      </button>

      <CardHeader className="flex flex-col items-center space-y-2 p-0">
        {/* Avatar */}
        <Image
          src={avatarUrl}
          alt={name}
          width={96}          
          height={96}         
          className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        />

        {/* Name */}
        <h3 className="text-lg font-semibold">{name}</h3>

        {/* Location */}
        <p className="text-sm text-muted-foreground">{location}</p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-1 mt-1">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardFooter className="pt-4 w-full">
        <Button
          onClick={handleViewProfile}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
