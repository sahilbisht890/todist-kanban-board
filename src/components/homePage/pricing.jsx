import React from "react";

const Pricing = () => {
  // Pricing plan data
  const plans = [
    {
      title: "Basic",
      description: "Perfect for individuals starting small projects.",
      price: "$10/month",
      features: ["✔️ 1 Project", "✔️ 10 Tasks", "✔️ Email Support"],
    },
    {
      title: "Medium",
      description: "Ideal for growing teams with advanced features.",
      price: "$30/month",
      features: ["✔️ 5 Projects", "✔️ 50 Tasks", "✔️ Priority Support"],
    },
    {
      title: "Premium",
      description: "Best for businesses managing multiple projects.",
      price: "$50/month",
      features: [
        "✔️ Unlimited Projects",
        "✔️ Unlimited Tasks",
        "✔️ 24/7 Support",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-4 p-6">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-red-600 md:text-5xl">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-700 mt-6 md:text-xl">
          Start managing your projects effortlessly with our tailored plans.
        </p>
      </div>

      <div className="flex w-full justify-center flex-wrap gap-8 md:gap-12 lg:gap-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="transform hover:scale-105 transition-transform duration-300 bg-white shadow-xl rounded-lg w-72 sm:w-80 p-6 border-2 border-gray-400 hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            <h3 className="text-2xl font-bold text-red-600 md:text-3xl">
              {plan.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 md:text-base">
              {plan.description}
            </p>
            <div className="text-4xl font-extrabold text-red-600 mt-6">
              {plan.price}
            </div>
            <ul className="text-gray-600 mt-6 space-y-2 text-sm md:text-base">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="w-full mt-8 bg-red-600 text-white py-2 rounded-lg font-bold text-sm md:text-base hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:shadow-xl transition-all">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
