import React from "react";
import { motion } from "framer-motion";
import { CheckCircleOutlined, CrownOutlined, RocketOutlined, ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import Header from "../common/header";

const Pricing = ({ pricingRef }) => {
  const plans = [
    {
      title: "Basic",
      icon: <CheckCircleOutlined />,
      description: "Perfect for individuals starting small projects.",
      price: "$10/month",
      features: ["1 Project", "10 Tasks", "Email Support"],
      popular: false,
    },
    {
      title: "Medium",
      icon: <RocketOutlined />,
      description: "Ideal for growing teams with advanced features.",
      price: "$30/month",
      features: ["5 Projects", "50 Tasks", "Priority Support"],
      popular: true,
    },
    {
      title: "Premium",
      icon: <CrownOutlined />,
      description: "Best for businesses managing multiple projects.",
      price: "$50/month",
      features: ["Unlimited Projects", "Unlimited Tasks", "24/7 Support"],
      popular: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={pricingRef} className="py-10 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Header 
          title={"Choose Your Plan"} 
          description={"Start managing your projects effortlessly with our tailored plans."} 
        />
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={`relative bg-white rounded-xl shadow-lg  border-2 ${
                plan.popular 
                  ? "border-red-500 shadow-xl md:scale-105" 
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center text-xs font-bold">
                    <StarFilled className="mr-1" />
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className={`p-6 md:p-8 ${plan.popular ? 'pt-10' : ''}`}>
                <div className="flex justify-center mb-4">
                  <div className="text-[24px] md:text-3xl text-red-600 h-[48px] w-[48px] md:w-[60px] md:h-[60px] flex items-center justify-center bg-red-100  rounded-full">
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 text-center">{plan.title}</h3>
                <p className="text-gray-600 mt-2 text-center">{plan.description}</p>
                
                <div className="mt-6 text-center">
                  <span className="text-4xl font-bold text-red-600">{plan.price}</span>
                </div>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircleOutlined className="text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full mt-8 py-3 rounded-lg font-semibold flex items-center justify-center ${
                    plan.popular
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  } transition-colors`}
                >
                  Get Started
                  <ArrowRightOutlined className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>All plans come with a 14-day money-back guarantee</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;