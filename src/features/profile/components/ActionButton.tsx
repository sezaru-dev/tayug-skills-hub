import React from "react"
import { Button } from "@/components/ui/button"
import { PencilLine, Plus } from "lucide-react"

type ActionButtonProps = React.ComponentProps<typeof Button> & {
  actionType?: "edit" | "add"
}

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  ActionButtonProps
>(({ className, actionType = "edit", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={className}
      {...props}
    >
      {actionType === "edit" && (<PencilLine size={14} />)}
      {actionType === "add" && <Plus size={14} />}
    </Button>
  )
})

ActionButton.displayName = "ActionButton"