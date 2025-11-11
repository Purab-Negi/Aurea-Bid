import { steps } from "@/constants/constant";

const HowItWorks = () => (
  <section className="bg-[#0E0E0E] text-white py-16 px-6 lg:ml-[278px] transition-all duration-300">
    <h2 className="text-center text-4xl font-bold text-[#F4B400] mb-12">
      How AureaBid Works
    </h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={index}
            className="bg-[#1A1A1A] border border-[#F4B400]/30 p-6 rounded-xl 
                     hover:shadow-lg cursor-pointer hover:shadow-[#F4B400]/20 transition-all"
          >
            <Icon className="text-[#F4B400] text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);
export default HowItWorks;
