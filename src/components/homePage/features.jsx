import React from "react";
import { useInView } from "react-intersection-observer";

const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const featuresData = [
    {
      title: "Multiple Projects",
      description:
        "Manage numerous projects simultaneously with easy-to-navigate dashboards that streamline your workflow.",
    },
    {
      title: "Drag and Drop",
      description:
        "Move tasks effortlessly with drag-and-drop functionality. Organize your workflow in real time with visual updates.",
    },
    {
      title: "List & Card View",
      description:
        "Tailor your experience by switching between list and card views, allowing for personalized task organization.",
    },
    {
      title: "Collaborative Tools",
      description:
        "Work seamlessly with your team using shared boards, real-time updates, and communication tools integrated into the platform.",
    },
  ];

  return (
    <div
      ref={ref}
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-10 md:py-16 lg:py-20 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center mb-14 max-w-3xl">
        <h1 className="text-3xl font-extrabold text-red-600 sm:text-4xl lg:text-5xl animate-fade-in">
          Features
        </h1>
        <p className="text-base text-gray-700 mt-6 sm:mt-8 sm:text-lg lg:text-xl">
          Discover the powerful tools designed to elevate your productivity.
          Seamlessly manage tasks, organize your work, and collaborate
          efficiently with our interactive features. These tools are built to
          help you achieve your goals with ease and style.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {featuresData.map((card, index) => (
          <div
            key={index}
            className={`transform flex flex-col justify-between hover:scale-105 bg-white shadow-xl rounded-lg w-full p-6 border-2 border-gray-300 relative overflow-hidden transition-opacity duration-700 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            <div>
              <div
                className={`absolute inset-0 bg-gradient-to-r from-red-800 via-red-500 to-red-300 opacity-0 hover:opacity-20 transition-opacity duration-300`}
              ></div>
              <h3 className={`text-xl font-bold text-red-800 sm:text-2xl`}>
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 sm:text-base">
                {card.description}
              </p>
            </div>
            <button
              className={`w-full mt-4 bg-red-700 text-white py-2 rounded-lg font-bold text-sm sm:text-base hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:shadow-xl transition-all`}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
