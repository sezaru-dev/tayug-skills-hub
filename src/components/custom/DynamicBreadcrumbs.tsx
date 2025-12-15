'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')

export const DynamicBreadcrumbs = () => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid mismatch

  const segments = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList
        className="
          flex flex-wrap md:flex-nowrap 
          overflow-x-auto whitespace-nowrap 
          scrollbar-hide
          gap-1 md:gap-2
          max-w-full
        "
      >
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/')
          const isLast = index === segments.length - 1
          const isFirst = index === 0

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem className="truncate max-w-[100px] sm:max-w-[150px]">
                {isLast || isFirst ? (
                  <BreadcrumbPage className="truncate">
                    {capitalize(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="truncate">
                    {capitalize(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
