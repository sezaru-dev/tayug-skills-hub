import { features } from "@/app/constant-data";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function WhatMakesUsDifferent() {

  type FeatureCardProps = {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    title: string, 
    desc: string, 
    bgColor: string, 
    textColor: string
  }
  
  const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  bgColor,
  textColor,
}: FeatureCardProps) => (
  <article
    className="
      group
      h-full
      border
      border-border
      bg-white
      p-7
      transition-colors
      duration-200
      hover:bg-muted/30
    "
  >
    <div
      className={`
        mb-6
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-md
        ${bgColor}
      `}
    >
      <Icon className={`h-5 w-5 ${textColor}`} />
    </div>

    <div className="space-y-3">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="text-sm leading-7 text-muted-foreground">
        {desc}
      </p>
    </div>
  </article>
)

  return (
    <section className="py-20 bg-white px-4">
      <div className='max-w-7xl mx-auto'>

        {/* Header */}
        <header className='mb-16 max-w-3xl'>
          <h2 className='text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4'>
            What Makes Our Platform Different
          </h2>

          <p className='text-muted-foreground leading-relaxed'>
            Tayug’s local talent marketplace built for simplicity, trust, and real connections.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              bgColor={item.bgColor}
              textColor={item.textColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
