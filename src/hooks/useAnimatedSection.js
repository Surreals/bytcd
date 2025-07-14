import { useInView } from 'react-intersection-observer';

export const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const useAnimatedSection = (threshold = 0.1) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: threshold, // Trigger when a percentage of the section is visible
  });
  return { ref, inView };
};

export default useAnimatedSection;