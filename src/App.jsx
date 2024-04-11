
import { BrowserRouter as BrowserRouter } from "react-router-dom";
// as Router, Routes, Route, 

import Contact from "./components/Contact";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";


const App = () => {
  return (
    <BrowserRouter>
      <div className="z-0 bg-primary w-full h-full">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </BrowserRouter>
  )
}

export default App
