"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ManageProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "Juan Dela Cruz", // private, read-only
    displayName: "Juan's Electrical Services", // locked after approval
    skillCategory: "Electrician", // locked after approval
    bio: "I provide residential wiring and small repairs.", // locked after approval
    location: "Tayug, Pangasinan",
    contactEmail: "juan@example.com",
    contactPhone: "09171234567",
    messenger: "https://m.me/juanprofile",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Call API to update profile
    console.log("Submitting updated profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Profile</h1>
          <p className="text-muted-foreground text-sm">
            Update your professional information, showcase your skills, and keep your profile current.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <Card className="w-full">
        <CardContent className="p-6 space-y-6">
          {/* Full Name (Private, Read-Only) */}
          <div className="flex flex-col space-y-2 w-full">
            <Label>Full Name (Private)</Label>
            <Input value={profile.fullName} readOnly className="w-full bg-muted" />
            <p className="text-xs text-muted-foreground">
              Your real name is private and cannot be changed here.
            </p>
          </div>

          <Separator />

          {/* Display Name (Locked after approval) */}
          <div className="flex flex-col space-y-2 w-full">
            <Label>Display Name (Public)</Label>
            <Input value={profile.displayName} readOnly className="w-full bg-muted" />
            <p className="text-xs text-muted-foreground">
              Display name is locked after admin approval.
            </p>
          </div>

          {/* Skill Category (Locked after approval) */}
          <div className="flex flex-col space-y-2 w-full">
            <Label>Skill Category</Label>
            <Input value={profile.skillCategory} readOnly className="w-full bg-muted" />
            <p className="text-xs text-muted-foreground">
              Cannot be changed after approval.
            </p>
          </div>

          {/* Bio (Locked after approval) */}
          <div className="flex flex-col space-y-2 w-full">
            <Label>Service Description</Label>
            <textarea
              value={profile.bio}
              readOnly
              rows={5}
              className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Cannot be changed after approval.
            </p>
          </div>

          <Separator />

          {/* Editable Fields */}
          <div className="space-y-6">
            {/* Location */}
            <div className="flex flex-col space-y-2 w-full">
              <Label>Location</Label>
              <Input
                value={profile.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full"
                placeholder="Barangay / Town"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <Label>Contact Information</Label>
              <p className="text-xs text-muted-foreground">
                Provide at least <strong>one</strong> way for clients to contact you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col w-full">
                  <Label>Contact Email</Label>
                  <Input
                    value={profile.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Label>Contact Phone</Label>
                  <Input
                    value={profile.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    placeholder="09xxxxxxxxx"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <Label>Messenger / Social Link</Label>
                <Input
                  value={profile.messenger}
                  onChange={(e) => handleChange("messenger", e.target.value)}
                  placeholder="https://m.me/yourprofile"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button size="lg" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
