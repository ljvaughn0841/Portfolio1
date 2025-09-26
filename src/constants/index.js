// import {
//     mobile,
//     backend,
//     creator,
//     web,
//     javascript,
//     typescript,
//     html,
//     css,
//     reactjs,
//     redux,
//     tailwind,
//     nodejs,
//     mongodb,
//     git,
//     figma,
//     docker,
//     meta,
//     starbucks,
//     tesla,
//     shopify,
//     carrent,
//     jobit,
//     tripguide,
//     threejs,
//   } from "../assets";


import coding from "../assets/Coding.png";
import datasci from "../assets/DataSci.png";
import web from "../assets/Web.png";
import wave from "../assets/wave_browser_project.png";
import foresight from "../assets/foresight_project.png";
import solarroof from "../assets/solarroof.png";
import tradenetwork1 from "../assets/trade_network1.png";
import tumor from "../assets/tumor.png";

  export const navLinks = [
    {
      id: "Home",
      title: "Home",
    },
    {
      id: "Skills",
      title: "Skills",
    },
    {
      id: "Projects",
      title: "Projects",
    },
    {
      id: "Experience",
      title: "Experience",
    },
    {
      id: "Contact",
      title: "Contact",
    },
  ];

  export const mySkills = [
  {
    id: "software",
    title: "Software Development",
    text: "Skilled in software development primarily utilizing: Python, C++, Java, JavaScript.",
    icon: coding
  },
  {
    id: "data",
    title: "Data Science",
    text: "Experienced in data science and analytics using Python, R, and SQL.",
    icon: datasci
  },
  {
    id: "web",
    title: "Web Development",
    text: "Experienced in web development. As well as utilizing low code solutions like Wordpress, Wix, and Shopify.",
    icon: web
  }
  ];

  export const projects = [
    {
      name: "Wave Browser for Mobile",
      description:
        "For my capstone project at FGCU our team worked on developing a port of Spigots (Now Eightpoint's) Wave Browser applications for both Android and iOS devices for our senior group project. Our project focused on rebranding the open-source Chromium browser and integrating Wave Browsers search engine for mobile devices.",
      category: 'Software',
      image: wave,
      external_link: "https://wavebrowser.com/",
    },
    {
      name: "ForeSight",
      description:
        "Fore Sight was created as a group project for our Computer Networks class at FGCU. It utilizes an AI trained for Monocular Depth Estimation called MiDaS to produce a depth map then detects hard edges in the depth map using Canny Edge Detection to find potential hazards.",
      category: 'Software',
      image: foresight,
      source_code_link: "https://github.com/ljvaughn0841/ForeSight-FGCU",
    },
    {
      name: "KnightHacks VII Winner - Watt Are You Doing?",
      description:
        "I collaborated with a team to build a Streamlit web app that generates personalized solar reports for consumers. The application integrates Google’s Geocoding and Solar APIs to map user addresses, assess roof size and environmental factors, and evaluate solar potential. I also developed a forecasting model to estimate lifetime savings from solar adoption, helping users understand both the environmental and financial benefits of switching to solar.",
      category:'Data Analytics',
      image: solarroof,
      source_code_link: "https://github.com/jtran6796/Efficient-Energy",
      external_link: "https://devpost.com/software/wattareyoudoing",
    },
    {
      name: "Trade Network Analysis",
      description:
        "I analyzed over 17,000 international trade routes across 226 countries to model the global food trade network. Using community detection methods, I identified clusters and patterns in trade relationships, then evaluated the network’s resilience under simulated disruptions to uncover key vulnerabilities. The project was implemented with Python, OpenCV, NumPy, Matplotlib, and PyTorch.",
      category:'Data Analytics',
      image: tradenetwork1,
      // external_link: "WIP",
    },
    {
      name: "Tumor Detection and Classification with Vision Transformers",
      description:
        "I fine-tuned a Vision Transformer (ViT) model to detect and classify brain tumors in MRI scans, achieving 80% test accuracy on a medical imaging dataset. To improve stability and performance with limited labeled data, I applied progressive unfreezing during training to gradually fine-tune deeper layers of the model. The project was implemented using Python, Hugging Face, PyTorch, and CUDA.",
      category:'Data Analytics',
      image: tumor,
      // external_link: "WIP",
    },
  ];