import { cn } from "@/lib/utils"
import React from "react"

type SectionCardProps = {
  title: string
  action?: React.ReactNode
  className?: string
  children: React.ReactNode
  isEditing?: boolean
}

export function SectionCard({title,action,className,children,isEditing = false}: SectionCardProps) {
  return (
    <section
      className={cn(
        "p-4 rounded-md transition-all space-y-3 sm:space-y-4",
        isEditing
          ? "bg-white border shadow-sm"
          : "bg-muted/20 border border-transparent",
        className
      )}
    >

      <div className="flex items-center justify-between">
        <h2 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">{title}</h2>
        {action}
      </div>

      {children}
    </section>
  )
}

