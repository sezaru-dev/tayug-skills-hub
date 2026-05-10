'use client'

import React from 'react'

type Props = {
  about?: string
}

const AboutSectionView = ({ about }: Props) => {
  return (
    <>
      {about ? (
        <p className="text-sm sm:text-base leading-relaxed text-foreground/80 max-w-3xl">
          {about}
        </p>
      ) : (
        <p className="text-gray-500 italic text-sm">
          Your about information goes here.
        </p>
      )}
    </>
  )
}

export default AboutSectionView