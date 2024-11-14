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
          >
            <Container fluid>
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
                  <Offcanvas.Title id="offcanvasNavbarLabel">Meniu</Offcanvas.Title>
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
                      Pagrindinis
                    </NavLink>
                    <NavLink
                      to="/login"
                      onClick={handleCloseOffcanvas}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Prisijungimas
                    </NavLink>
                    <NavLink
                      to="/registerClient"
                      onClick={handleCloseOffcanvas}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Registruotis klientui
                    </NavLink>
                    <NavLink
                      to="/registerPersonel"
                      onClick={handleCloseOffcanvas}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Registruotis personalui
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

