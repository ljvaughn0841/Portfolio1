import React, { useState, useEffect } from 'react';
import  {Link} from 'react-router-dom';

//import { styles } from '../styles';
import { navLinks } from '../constants';
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

const NavBar = () => {
    const [active, setActive] = useState('')
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
          const sections = navLinks.map(link => document.getElementById(link.id));
          const scrollPos = window.scrollY + 500; // offset 500 for contact section (footer)
          for (let section of sections) {
            if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
              setActive(section.id);
              break;
            }
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <nav 
        className = {'${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-50 bg-tertiary'}>

        <div className='w-full flex justify-center items-center max-w-7xl mx-auto content-center border border-red-800'>
            {/* Desktop NavBar */}
            <ul className="list-none hidden sm:flex flex-row gap-10 tiny5-regular">
                {navLinks.map((Link) => (
                    <li key={Link}
                    className={`${
                        active === Link.title
                        ? "text-white"
                        : "text-secondary"
                    } hover:text-[#86829b] text-[20px] font-medium cursor-pointer
                    `}
                    onClick={() => setActive(Link.title)}
                    >
                        <a href={`#${Link.id}`}>{Link.title}</a>
                    </li>
                ))}
            </ul>

            {/* Mobile Nav Bar */}
            <div className="sm:hidden flex flex-1 justify-between items-center mx-5">
                <div className='sm:hidden flex flex-1 justify-start items-center'>
                    {/* <img src='src/assets/ljv_logo.png' alt="logo" className="w-9 h-9 object-contain"/> */}
                    <p className='ml-5 silkscreen-bold text-xl'>LJV</p>
                </div>
                <img src={toggle ? close : menu} alt="logo" className="w-9 h-9 object-contain" onClick={() => setToggle((prev) => !prev)}/>

                <div className={`${!toggle ? 'hidden' : 'flex'} absolute top-[78px] right-0 z-10 rounded-xl`}>
                    <ul className="list-none flex justify-end items-start flex-col gap-5 tiny5-regular bg-tertiary pr-10 pl-5 pt-2 pb-2">
                        {navLinks.map((Link) => (
                    <li key={Link}
                    className={`${
                        active === Link.title
                        ? "text-white"
                        : "text-secondary"
                    } hover:text-[#67637c] text-[20px] font-medium cursor-pointer
                    `}
                    onClick={() => setActive(Link.title)}
                    >
                        <a href={`#${Link.id}`}>{Link.title}</a>
                    </li>
                ))}
            </ul>

                </div>
            </div>

        </div>

        </nav>
    )
}

export default NavBar