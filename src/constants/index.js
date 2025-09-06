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
import can from "../assets/can_project.png";

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
      source_code_link: "https://github.com/",
      external_link: "https://wavebrowser.com/",
    },
    {
      name: "ForeSight",
      description:
        "Fore Sight was created as a group project for our Computer Networks class at FGCU. It utilizes an AI trained for Monocular Depth Estimation called MiDaS to produce a depth map then detects hard edges in the depth map using Canny Edge Detection to find potential hazards.",
      category: 'Software',
      image: foresight,
      source_code_link: "https://github.com/",
    },
    {
      name: "Reference Analytics",
      description:
        "When I decided to pursue a masters in Data Analytics, I completed this project using Canvas's API in order to find out what teachers I should ask for references.",
      category:'Data Analytics',
      image: wave,
      image2: foresight,
      image3: can,
      source_code_link: "https://github.com/",
    },
    {
      name: "Rotating Can",
      description:
        "Created this rotating can in blender as a freelance project for Don Pablo Coffee.",
      category:'Graphics',
      image: can,
      source_code_link: "https://github.com/",
    },
  ];