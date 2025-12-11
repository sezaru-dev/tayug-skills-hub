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
  
  const FeatureCard = ({ icon: Icon, title, desc, bgColor, textColor }: FeatureCardProps) => (
    <div className="p-6 rounded-xl bg-gray-50 shadow-sm">
      <div className={`mb-4 h-12 w-12 rounded-sm grid place-items-center ${bgColor}`}>
        <Icon className={`w-6 h-6 ${textColor}`} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );

  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-4xl font-semibold text-foreground">
            What Makes Our Platform Different
          </h2>
          <p className="text-gray-600">
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
