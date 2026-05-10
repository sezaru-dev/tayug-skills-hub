import React from 'react'

type ContactRowProps = {

  label: string
  value: string
}

const ContactRow = ({ label, value }: ContactRowProps) => {
  return (
    <div className="p-4 rounded-lg bg-muted/40">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-medium text-sm">
        {value}
      </p>
    </div>
  )
}

export default ContactRow