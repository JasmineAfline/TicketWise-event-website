// src/components/CompanyTimeline.jsx
import React from "react";
import { milestones } from "../data/milestones";

export default function CompanyTimeline() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Journey 🚀
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-purple-600"></div>

          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center justify-between md:space-x-6">
                
                {/* Text info */}
                <div
                  className={`md:w-1/2 ${
                    idx % 2 === 0 ? "md:order-1 text-right md:pr-12" : "md:order-2 md:pl-12 text-left"
                  }`}
                >
                  <h3 className="text-xl font-bold">{milestone.title}</h3>
                  <p className="text-purple-600 font-semibold">{milestone.year}</p>
                  <p className="text-gray-600 mt-1">{milestone.description}</p>
                </div>

                {/* Circle marker */}
                <div className="flex justify-center items-center w-8 h-8 bg-purple-600 rounded-full z-10 order-1 md:order-none">
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>

                {/* Optional: milestone image or icon */}
                <div className={`md:w-1/2 ${idx % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  {/* You can insert images/icons here if needed */}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
