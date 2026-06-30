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
import fontinator from "../assets/fontinator.png";
import fontinator_logo from "../assets/fontinator_logo.jpg";
import font_network from "../assets/font_network.png"

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

export const TAG_COLORS = {
  Python:  { bg: "#3B5BA5", text: "#E8F0FF" },
  MySQL:   { bg: "#00617A", text: "#D0F4FF" },
  Java:    { bg: "#B07219", text: "#FFF3DC" },
  "C++":   { bg: "#6B4FBB", text: "#EDE8FF" },
  React:   { bg: "#20232A", text: "#61DAFB" },
  Gephi:   { bg: "#1A6B3C", text: "#C6FFE0" },
  // Add more tags here — they'll automatically appear in the dropdown
};


  export const projects = [
    /*
    {
    name: "Example Project",
    description: `Very cool project. Very cool stuff`,
    category: 'Software', 'Data Analytics',  # choose a category
    image: main_image_on_explorer,
    images: [image1, image2, image3],
    external_link: "link",
    source_code_link: "link",
    tags: ['tag1', 'tag2']
    },
    */
    {
      name: "Wave Browser for Mobile",
      description:
        `For my capstone project at FGCU our team worked on developing a port of Spigots (Now Eightpoint's)
          Wave Browser applications for both Android and iOS devices for our senior group project.

          I focused on and led the Android development for this project. 
          This project focused on redesigning the open-source Chromium browser (one of the largest repositories on GitHub)
          and integrating Wave Browsers search engine for mobile devices.`,
      category: 'Software',
      image: wave,
      images: [wave],
      external_link: "https://wavebrowser.com/",
      tags: ["C++", "Java"],
    },
        {
      name: "Script Gap",
      description:
        `
        The Script Gap is a research project that helps to quantitatively identify scripts in need of more typographic development.
        We found that even though only 56% of the top 10 million websites support Latin, 74.4% of the fonts we found on these websites had support Latin.
        This basically means that Latin dominates typography even though there are hundereds of millions of people that read and write in other scripts.
        Our project aims to help type foundries in decision making for what scripts are in need of support based on the online demand as well as many other factors. 
        `,
      category:'Data Analytics',
      image: font_network,
      images: [font_network],
      // TODO: This will change in the future when the repo has been moved to the Lab this needs to be updated
      source_code_link: "https://github.com/Aditya-Khadye/TheScriptGap",
      external_link: "https://aditya-khadye.github.io/TheScriptGap/",
      tags: ["Python", "BigQuery"],
    },
    {
      name: "ForeSight",
      description:
        "Fore Sight was created as a group project for our Computer Networks class at FGCU. It utilizes an AI trained for Monocular Depth Estimation called MiDaS to produce a depth map then detects hard edges in the depth map using Canny Edge Detection to find potential hazards.",
      category: 'Software',
      image: foresight,
      images: [foresight],
      source_code_link: "https://github.com/ljvaughn0841/ForeSight-FGCU",
      tags: ["Python", "OpenCV", "PyTorch"],
    },
    {
      name: "KnightHacks VII Winner - Watt Are You Doing?",
      description:
        "I collaborated with a team to build a Streamlit web app that generates personalized solar reports for consumers. The application integrates Google’s Geocoding and Solar APIs to map user addresses, assess roof size and environmental factors, and evaluate solar potential. I also developed a forecasting model to estimate lifetime savings from solar adoption, helping users understand both the environmental and financial benefits of switching to solar.",
      category:'Data Analytics',
      image: solarroof,
      images: [solarroof],
      source_code_link: "https://github.com/jtran6796/Efficient-Energy",
      external_link: "https://devpost.com/software/wattareyoudoing",
      tags: ["Python", "Streamlit", "Google APIs"],
    },
    {
      name: "Trade Network Analysis",
      description:
        "I analyzed over 17,000 international trade routes across 226 countries to model the global food trade network. Using community detection methods, I identified clusters and patterns in trade relationships, then evaluated the network’s resilience under simulated disruptions to uncover key vulnerabilities. The project was implemented with Python, OpenCV, NumPy, Matplotlib, and PyTorch.",
      category:'Data Analytics',
      image: tradenetwork1,
      images: [tradenetwork1],
      // external_link: "WIP",
      tags: ["Python", "Gephi"],
    },
    {
      name: "Tumor Detection and Classification with ViT",
      description:
        "I fine-tuned a Vision Transformer (ViT) model to detect and classify brain tumors in MRI scans, achieving 80% test accuracy on a medical imaging dataset. To improve stability and performance with limited labeled data, I applied progressive unfreezing during training to gradually fine-tune deeper layers of the model. The project was implemented using Python, Hugging Face, PyTorch, and CUDA.",
      category:'Data Analytics',
      image: tumor,
      images: [tumor],
      // external_link: "WIP",
      tags: ["Python", "PyTorch"],
    },
    {
      name: "The Fontinator",
      description:
        `
        The fontinator is a new way for designers to search through a large number of fonts in a more visual way.
        It allows designers to have fine control over the attributes their looking for in a font so that they can 
        reach their desired font much faster than they would be able to by using the modern method of filter boxes and infinite scrolling.
        `,
      category:'Data Analytics',
      image: fontinator,
      images: [fontinator, fontinator_logo],
      // external_link: "WIP",
      tags: ["Python", "PyTorch"],
    },
  ];