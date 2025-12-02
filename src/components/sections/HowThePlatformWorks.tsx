import React from 'react'
import {ArrowRightLeft} from 'lucide-react'
import { clientSteps, freelancerSteps } from '@/app/constant-data'

export default function HowThePlatformWorks() {
  return (
    <section className='px-4 py-24 bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <header className='mb-12 text-center max-w-3xl mx-auto space-y-4'>
          <h2 className='text-4xl font-medium text-foreground'>How The Platform Works</h2>
          <p>Our streamlined process connects Tayug clients with skilled professionals through a simple yet powerful system that ensures trust, convenience, and satisfaction for both sides.</p>
        </header>
        <div className='max-w-5xl mx-auto grid grid-cols-11 grid-rows-1'>

          <div className='p-6 border col-span-5 col-start-0 col-end-6 relative bg-white rounded-md'>
            <header className='mb-4'>
              <h4 className='uppercase font-semibold text-blue-600'>for clients</h4>
            </header>
            <ol className='space-y-4'>
              {
                clientSteps.map((step) => (
                  <li className='flex' key={step.id}>
                    <div className='mr-2'>
                      <div className='col-span-1 font-bold bg-blue-600 text-white rounded-full h-8 w-8 grid place-items-center mr-6'>{step.id}</div>
                    </div>
                    <div className='col-span-11'>
                      <h5 className='font-semibold'>{step.title}</h5>
                      <p className='text-gray-600'>{step.description}</p>
                    </div>
                  </li>
                ))
              }
            </ol>
          </div>

          <div className='p-6 border col-span-5 col-start-7 col-end-12 relative bg-white rounded-md z-20'>
            <header className='mb-4'>
              <h4 className='uppercase font-semibold text-blue-950'>for freelancers</h4>
            </header>
            <ol className='space-y-4'>
              {
                freelancerSteps.map( ({id, title, description}) => (

                <li className='flex' key={id}>
                  <div className='mr-2'>
                    <div className='col-span-1 font-bold bg-blue-950 text-white rounded-full h-8 w-8 grid place-items-center mr-6'>{id}</div>
                  </div>
                  <div className='col-span-11'>
                    <h5 className='font-semibold'>{title}</h5>
                    <p className='text-gray-600'>{description}</p>
                  </div>
                </li>
                ))
              }

            </ol>
          </div>
          <div className='col-span-1 row-start-1 col-start-6 col-end-7 h-full grid place-items-center relative'>
            <div className='p-3 bg-blue-400/30 rounded-full h-fit w-fit absolute scale-[1.2]'>
              <div className='p-3 bg-blue-500/50 rounded-full h-fit w-fit'>
                <div className='h-12 w-12 bg-blue-600 rounded-full grid place-items-center text-white'>
                  <ArrowRightLeft/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
