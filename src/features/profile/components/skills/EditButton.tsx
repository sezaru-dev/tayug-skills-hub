import { Button } from "@/components/ui/button"
import { PencilLine } from "lucide-react"

type EditButtonProps = {
  className?: string
  isEditMode: boolean
  onClick?: () => void
}

const EditButton = ({ className, isEditMode, onClick }: EditButtonProps) => {
  if (isEditMode) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={onClick}
    >
      <PencilLine size={14} />
    </Button>
  )
}

export default EditButton