import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';

class Header extends Component {
  // constructor  
  constructor(props) {
        super(props);
    //binding
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        
  }
// add a new nav to the app 
    toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
//add a new Modal to the application to host the form
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
//to handle the form submission:
      handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

     }

//1.add a button to the Navbar to enable toggling the modal
//2.add the form to the modal body 
    render() {
        return (
            <div>
                <Navbar  dark expand="md">
                         <div className="container">
                         <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto" href="/">
                                Ristorante Con Fusion
                              <img
                                src="assets/images/logo.png"
                                height="30"
                                width="41"
                                alt="Ristorante Con Fusion"
                            />
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg" /> Home
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg" /> About Us
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg" /> Menu
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg" /> Contact Us
                                    </NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                            </Nav>
                            </Collapse>
                         </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>
                                        We take inspiration from the World's best cuisines, and create
                                        a unique fusion experience. Our lipsmacking creations will
                                        tickle your culinary senses!
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={input => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
            </div>
        );
    }
}

export default Header;