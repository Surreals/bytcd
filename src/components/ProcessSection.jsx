"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import { processSteps } from '../utils/constants';
import * as LucideIcons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = ({ id }) => {
  const { ref, inView } = useAnimatedSection();
  const timelineRef = React.useRef(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  React.useEffect(() => {
    if (inView && timelineRef.current) {
      // Animate the line drawing
      gsap.fromTo(
        timelineRef.current.querySelector('.timeline-line'),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.5,
          },
        }
      );

      // Stagger animation for each step
      gsap.utils.toArray(timelineRef.current.querySelectorAll('.process-step')).forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-white text-black p-8 md:p-16 py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-16">Our Process</h2>

        <div ref={timelineRef} className="relative flex flex-col items-center">
          {/* Vertical Line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-600 origin-top"></div>

          {processSteps.map((step, index) => {
            const Icon = LucideIcons[step.iconName] || LucideIcons.Box;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`process-step relative w-full md:w-1/2 py-8 flex items-center ${
                  isEven ? 'md:pr-16 md:self-start' : 'md:pl-16 md:self-end'
                }`}
              >
                {/* Circle Indicator */}
                <div className={`absolute w-6 h-6 bg-blue-600 rounded-full z-10 border-4 border-white top-1/2 -translate-y-1/2 ${
                  isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                }`}></div>

                <div
                  className={`flex flex-col p-6 rounded-xl shadow-md bg-gray-50 w-full ${
                    isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'
                  }`}
                >
                  {Icon && <Icon size={40} className="text-blue-600 mb-4" />}
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: step.description }}></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ProcessSection;