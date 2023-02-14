import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgCloseO } from 'react-icons/cg' 
import { useState } from 'react'

const MobileNavigation = () => {

const [open, setOpen] = useState(false);

const hamburgerIcon = <GiHamburgerMenu className='Hamburger' 
                        size='40px' color='#8A2BE2' 
                        onClick={() => setOpen(!open)}
                        />

const closeIcon = <CgCloseO className='Hamburger' 
                        size='40px' color='#8A2BE2' 
                        onClick={() => setOpen(!open)}
                        />

    const closeMobileMenu = () => setOpen(false);                    
    return (
        <nav className='MobileNavigation'>
         {open ? closeIcon : hamburgerIcon}   
         {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
        </nav>
    );
}

export default MobileNavigation
