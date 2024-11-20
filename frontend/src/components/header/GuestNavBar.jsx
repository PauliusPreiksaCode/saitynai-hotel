/* eslint-disable no-unused-vars, react/prop-types */
import React, { useContext, useState } from "react";
import { UserContext } from "../../services/authProvider";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import "../../global.css";
import "../../assets/plugins/bootstrap/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Logo from '../../assets/Logo.svg';


const GuestNavBar = () => {
    const user = useContext(UserContext);

      const [showOffcanvas, setShowOffcanvas] = useState(false);
      const handleCloseOffcanvas = () => setShowOffcanvas(false);
      const handleShowOffcanvas = () => setShowOffcanvas(true);

      return (
        <>
          <Navbar
            expand="lg"
            className="bg-body-tertiary sticky-top"
            collapseOnSelect
            style={{ margin: '0px', padding: '0px' }}
          >
            <Container fluid style={{background: '#C6E7FF'}}>
            <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Logo} alt="logo" style={{ width: '70px', height: '70px', marginRight: '5px' }} />
              </Navbar.Brand>
              <Navbar.Toggle
                onClick={handleShowOffcanvas}
                aria-controls="offcanvasNavbar"
              />
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                show={showOffcanvas}
                onHide={handleCloseOffcanvas}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink
                      to="/"
                      onClick={handleCloseOffcanvas}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/login"
                      onClick={handleCloseOffcanvas}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/registerClient"
                      onClick={handleCloseOffcanvas}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Register client
                    </NavLink>
                    <NavLink
                      to="/registerPersonel"
                      onClick={handleCloseOffcanvas}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Register personel
                    </NavLink>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </>
      );
    };

    export default GuestNavBar;

