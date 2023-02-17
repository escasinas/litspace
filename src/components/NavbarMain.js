import { NavLink } from 'react-router-dom';
import Navbar from'react-bootstrap/Navbar';
import Nav from'react-bootstrap/Nav';
import Container from'react-bootstrap/Container';
import ModalKey from './ModalKey';

function NavbarMain() {

    const toggleActive = ({ isActive }) => (isActive ? "activeLink" : "navText");
    
    return (
        <Navbar>

            <Container className="test">

                <Nav className="me-auto">
                    <ModalKey />
                    <div id="navLinkDiv">
                        <NavLink to="/reading" className={toggleActive}>Reading</NavLink>
                        <NavLink to="/writing" className={toggleActive}>Writing</NavLink>
                    </div>
                </Nav>

            </Container>
            
        </Navbar>
    )
}

export default NavbarMain;
