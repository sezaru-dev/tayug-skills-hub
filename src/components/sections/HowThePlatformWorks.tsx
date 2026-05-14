import React from 'react'
import { clientSteps, freelancerSteps } from '@/app/constant-data'

export default function HowThePlatformWorks() {
  return (
    <section className='px-4 py-24 bg-white'>
      <div className='max-w-7xl mx-auto'>

        {/* Header */}
        <header className='mb-16 max-w-3xl'>
          <h2 className='text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4'>
            How It Works
          </h2>

          <p className='text-muted-foreground leading-relaxed'>
            Tayug Skills Hub connects people looking for services with local
            individuals offering skills in a simple and direct way.
          </p>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

          {/* LEFT */}
          <div className='border border-border bg-white p-8 sm:p-10'>

            <header className='mb-10'>
              <p className='text-xs tracking-[0.2em] uppercase text-blue-600 mb-3'>
                Looking for Help
              </p>

              <h3 className='text-xl font-semibold tracking-tight text-foreground'>
                Find the right person for the job.
              </h3>
            </header>

            <ol className='space-y-9'>
              {clientSteps.map((step) => (
                <li key={step.id} className='flex gap-5'>

                  <div className='h-8 w-8 shrink-0 rounded-full border border-blue-200 text-blue-600 text-sm font-medium grid place-items-center'>
                    {step.id}
                  </div>

                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold text-foreground'>
                      {step.title}
                    </h4>

                    <p className='text-base text-muted-foreground leading-7'>
                      {step.description}
                    </p>
                  </div>

                </li>
              ))}
            </ol>
          </div>

          {/* RIGHT */}
          <div className='border border-border bg-white p-8 sm:p-10'>

            <header className='mb-10'>
              <p className='text-xs tracking-[0.2em] uppercase text-blue-600 mb-3'>
                Offer Services
              </p>

              <h3 className='text-xl font-semibold tracking-tight text-foreground'>
                Make your skills discoverable.
              </h3>
            </header>

            <ol className='space-y-9'>
              {freelancerSteps.map(({ id, title, description }) => (
                <li key={id} className='flex gap-5'>

                  <div className='h-8 w-8 shrink-0 rounded-full border border-blue-200 text-blue-600 text-sm font-medium grid place-items-center'>
                    {id}
                  </div>

                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold text-foreground'>
                      {title}
                    </h4>

                    <p className='text-base text-muted-foreground leading-7'>
                      {description}
                    </p>
                  </div>

                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  )
}
