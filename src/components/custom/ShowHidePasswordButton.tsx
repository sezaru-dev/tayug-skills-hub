import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import React from 'react'

interface ShowHidePasswordButtonProps {
  show: boolean
  onToggle: () => void
}

const ShowHidePasswordButton = ({show, onToggle}: ShowHidePasswordButtonProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-neutral-400 hover:bg-transparent hover:text-neutral-600"
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>

  )
}

export default ShowHidePasswordButton