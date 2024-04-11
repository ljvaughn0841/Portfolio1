import React, { useState } from 'react';
import  {Link} from 'react-router-dom';

//import { styles } from '../styles';
import { navLinks } from '../constants';
const NavBar = () => {
    const [active, setActive] = useState('')

    return (
        <nav 
        className = {'${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-tertiary'}>

        <div className='w-full flex justify-center items-center max-w-7xl mx-auto content-center border border-red-800'>
            {/* Desktop NavBar */}
            <ul className="list-none hidden sm:flex flex-row gap-10">
                {navLinks.map((Link) => (
                    <li key={Link}
                    className={`${
                        active === Link.title
                        ? "text-white"
                        : "text-secondary"
                    } hover:text-white text-[18px] font-medium cursor-pointer
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