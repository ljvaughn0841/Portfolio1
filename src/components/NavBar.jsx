import React, { useState, useEffect } from 'react';
import  {Link} from 'react-router-dom';

//import { styles } from '../styles';
import { navLinks } from '../constants';
const NavBar = () => {
    const [active, setActive] = useState('')

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
                <p>NAME/LOGO PLACEHOLDER</p>
                <p>MENU ICON</p>
            </div>

        </div>

        </nav>
    )
}

export default NavBar