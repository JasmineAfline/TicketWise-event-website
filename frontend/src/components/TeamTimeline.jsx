// src/components/TeamTimeline.jsx
import React from "react";
import { teamMembers } from "../data/team";

export default function TeamTimeline() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Team & Journey</h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-purple-600"></div>

          <div className="space-y-12">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center justify-between md:space-x-6">
                
                {/* Text info */}
                <div
                  className={`md:w-1/2 ${
                    idx % 2 === 0 ? "md:order-1 text-right md:pr-12" : "md:order-2 md:pl-12 text-left"
                  }`}
                >
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-purple-600 font-semibold">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-1">Joined: {member.joined}</p>
                </div>

                {/* Circle marker */}
                <div className="flex justify-center items-center w-8 h-8 bg-purple-600 rounded-full z-10 order-1 md:order-none">
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>

                {/* Image */}
                <div className={`md:w-1/2 ${idx % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="rounded-full w-40 h-40 object-cover mx-auto md:mx-0"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
