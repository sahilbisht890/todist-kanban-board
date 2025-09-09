import React from "react";
import {
  IconListCheck,
  IconArrowsSort,
  IconLayoutGrid,
  IconUsers,
  IconBellRinging,
  IconChartBar
} from "@tabler/icons-react";
import Header from "../common/header";

const Features = ({ featuresRef }) => {
  const inView = true;

  const featuresData = [
    {
      icon: <IconListCheck className="text-red-600" />,
      title: "Task Management",
      description: "Create, organize, and prioritize tasks with our intuitive drag-and-drop interface."
    },
    {
      icon: <IconArrowsSort className="text-red-600" />,
      title: "Priority Levels",
      description: "Set priority levels to focus on what matters most with our color-coded system."
    },
    {
      icon: <IconLayoutGrid className="text-red-600" />,
      title: "Project Views",
      description: "Switch between list, board, and timeline views to visualize your projects your way."
    },
    {
      icon: <IconUsers className="text-red-600" />,
      title: "Team Collaboration",
      description: "Assign tasks, share projects, and comment in real-time with your team members."
    },
    {
      icon: <IconBellRinging className="text-red-600" />,
      title: "Smart Reminders",
      description: "Get intelligent reminders based on due dates, locations, and your work patterns."
    },
    {
      icon: <IconChartBar className="text-red-600" />,
      title: "Productivity Analytics",
      description: "Track your completion rates and identify patterns to improve your workflow."
    }
  ];

  return (
    <div
      ref={featuresRef}
      className="w-full py-12 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}

        <Header title={"Powerful Features"} description={"Discover the powerful tools designed to elevate your productivity. Seamlessly manage tasks, organize your work, and collaborate efficiently."} />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
                <div className="text-2xl">
                  {React.cloneElement(feature.icon, { size: 30 })}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;