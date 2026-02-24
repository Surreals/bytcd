import carbookImage from '../assets/carbook_bg.jpg'; // Updated import for carbook_bg
import galinfoLogoGood from '../assets/galinfo_logo_aioff.png'; // Corrected import for GalInfo good logo
import infomoLogoBlack from '../assets/infomo_logo_black.png'; // Import IN-FOMO black logo
import galinfoBg from '../assets/galinfo_bg.png'; // Corrected import for GalInfo background image
import infomoBg from '../assets/infomo_bg.png'; // Import IN-FOMO background image
import bytcdBg from '../assets/bytcd_bg.png'; // Import BYTCD background image
import bytcdWhiteLogo from '../assets/logo/bytcd_white.png'; // Import BYTCD white logo
import bytcdGrayLogo from '../assets/bytcd_gray.png'; // Import BYTCD gray logo

export const mainLinks = [
    {name: 'instagram', url: 'https://www.instagram.com/bytcd.co/'},
    // {name: 'INSTAGRAM', url: 'https://www.instagram.com/surreal4you/'},
]

export const sideLinks = [
    // {name: 'soon', url: '#'},
]

export const processSteps = [
  {
    title: "Discovery & Strategy",
    description: "We begin by understanding your vision, goals, and target audience. This phase involves in-depth research, brainstorming, and strategic planning to lay a solid foundation for your project.",
    iconName: "Search",
  },
  {
    title: "Design & Prototyping",
    description: "Our creative team crafts intuitive and visually stunning UI/UX designs. We develop wireframes, mockups, and interactive prototypes to ensure the user experience is seamless and engaging.",
    iconName: "Palette",
  },
  {
    title: "Development & Implementation",
    description: "Bringing designs to life, our developers build robust and scalable solutions using cutting-edge technologies. We focus on clean code, performance, and cross-platform compatibility.",
    iconName: "Code",
  },
  {
    title: "Testing & Quality Assurance",
    description: "Rigorous testing is conducted to identify and resolve any bugs or issues. We ensure your application is fully functional, secure, and performs flawlessly across all devices and browsers.",
    iconName: "CheckCircle",
  },
  {
    title: "Deployment & Launch",
    description: "Once perfected, we assist with the smooth deployment of your project. Our team ensures a successful launch, making your digital product accessible to your audience.",
    iconName: "Rocket",
  },
  {
    title: "Maintenance & Support",
    description: "Our commitment extends beyond launch. We provide ongoing maintenance, updates, and support to ensure your application remains secure, efficient, and up-to-date with evolving technologies.",
    iconName: "Wrench",
  },
];

export const clientProjects = [
  {
    id: 'carbook',
    title: 'Carbook.pro',
    description: 'A modern Service Station CRM platform with enhanced user experience and conversion optimization.',
    image: carbookImage, // Full project screenshot
    logo: 'https://shelfy.com.ua/wp-content/uploads/2024/05/carbook.png', // Placeholder logo
    link: 'https://carbook.mobi/',
  },
  {
    id: 'galinfo',
    title: 'GalInfo',
    description: 'Leading Ukrainian news portal with a focus on regional and national news.',
    image: galinfoBg, // Using the correct background image
    logo: galinfoLogoGood,
    link: 'https://galinfo.com.ua/',
  },
  // {
  //   id: 'in-fomo',
  //   title: 'IN-FOMO',
  //   description: 'Innovative platform for market research and consumer insights.',
  //   image: infomoBg, // Using the correct background image
  //   logo: infomoLogoBlack,
  //   link: 'https://in-fomo.com/',
  // },
  {
    id: 'bytcd-internal',
    title: 'BYTCD Internal Project',
    description: 'An internal project showcasing our capabilities in design and development.',
    image: bytcdBg, // Using the new BYTCD background image
    logo: bytcdGrayLogo, // Using the BYTCD gray logo
    link: '#',
  },
  // {
  //   id: 'project-3',
  //   title: 'Brand Identity & Website',
  //   description: 'Complete brand overhaul and a new corporate website reflecting modern aesthetics and values.',
  //   image: 'https://images.unsplash.com/photo-1522199755839-fd245a284972?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   logo: '/icon.svg', // Using the BYTCD icon as the logo
  //   link: '#',
  // },
];