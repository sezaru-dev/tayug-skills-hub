'use client'

import React from 'react'
import ContactRow from './ContactRow'
import { Phone } from 'lucide-react'

type Props = {
  phoneNumber?: string | null
}

const ContactSectionView = ({ phoneNumber }: Props) => {
  const hasPhone = !!phoneNumber

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
      {hasPhone ? (
        <ContactRow
          label="Phone"
          value={phoneNumber!}
        />
      ) : (
        <div className="py-4 text-sm text-gray-400 flex items-center gap-2">
          <Phone size={16} className="text-gray-300" />
          <span>No phone number added</span>
        </div>
      )}
    </div>
  )
}

export default ContactSectionView