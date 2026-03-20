'use client'

import { toast } from 'sonner'
import { CircleCheckIcon, Info, OctagonXIcon } from 'lucide-react'

export function infoToast(toastId: string | number, message: string) {
  toast.success(message, {
    id: toastId,
    icon: <Info className="h-5 w-5 text-white" />,
    style: { backgroundColor: '#22c55e', color:'#fff' },
  })
}

export function successToast(toastId: string | number, message: string) {
  toast.success(message, {
    id: toastId,
    icon: <CircleCheckIcon className="h-5 w-5 text-white" />,
    style: { backgroundColor: '#22c55e', color:'#fff' },
  })
}

export function warningToast(toastId: string | number, message: string) {
  toast.error(message, {
    id: toastId,
    icon: <OctagonXIcon className="h-5 w-5 text-white" />,
    style: { backgroundColor: '#f97316', color:'#fff' },
  })
}
export function errorToast(toastId: string | number, message: string) {
  toast.error(message, {
    id: toastId,
    icon: <OctagonXIcon className="h-5 w-5 text-white" />,
    style: { backgroundColor: '#ef4444', color:'#fff' },
  })
}