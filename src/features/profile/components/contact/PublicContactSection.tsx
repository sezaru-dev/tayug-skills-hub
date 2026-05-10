'use client'

import React from 'react'
import { SectionCard } from '../SectionCard'
import ContactSectionView from './ContactSectionView'

type Props = {
  phoneNumber?: string | null
}

const PublicContactSection = ({ phoneNumber }: Props) => {
  return (
    <SectionCard title="Contact">
      <ContactSectionView phoneNumber={phoneNumber} />
    </SectionCard>
  )
}

export default PublicContactSection