import {Navbar, Container, Nav, Form, FormControl, Button, Col, InputGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas'
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import 'reactjs-popup/dist/index.css';

const NavBar = (props) => {
    let isLoggedIn = props.isLoggedIn;
    let [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [friends, setFriends] = useState(null);
    const [toAdd, setToAdd] = useState("");
    const [addError, setAddError] = useState(false);
    const [userError, setUserError] = useState(false);
    const [addedFriend, setAddedFriend] = useState(0);
    const [dispFriend, setDispFriend] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setAddedFriend(addedFriend+1);
    }
    
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleAddFriend = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/accounts/username/${toAdd}`)
            .then( (response) => {
                if(response.data.length === 0){
                    setAddError(true);
                }
                else {
                    setAddError(false);
                    let friendId = response.data[0].id;
                    if(friendId === user.id){
                        setUserError(true);
                    }
                    else {
                    setUserError(false);
                    axios.post(`http://localhost:3001/friends?id1=${user.id}&id2=${friendId}`)
                        .then((response) => {
                            setAddedFriend(addedFriend+1);
                            handleCloseModal();
                        });
                    }
                }
            })
            .catch( (error) => {
                console.log(error);

            })
    }

    const handleDeleteFriend = (e) => {
        e.preventDefault();
        let id = e.currentTarget.id;
        axios.delete(`http://localhost:3001/friends?id1=${user.id}&id2=${id}`)
            .then((response) => {
                setAddedFriend(addedFriend-1);
            })
            
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);       
          setUser(foundUser);

        }
      }, [isLoggedIn]);

    useEffect( () => {
        if(user){
            axios.get(`http://localhost:3001/friends/${user.id}`)
                .then( (response) => {
                    setFriends(response.data);
                    setDispFriend(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, addedFriend]);

    useEffect ( () => {
        if(user) {
            let newFriends = [];
            friends.forEach( (friend) => {
                if(friend.username.includes(search)){
                    newFriends.push(friend);
                }
            });
            setDispFriend(newFriends);
        }
    }, [search])

    const logout = (e) => {
        if(window.confirm("Are you sure you want to log out ?")){
            localStorage.clear();
            props.setIsLoggedIn(false);
            setUser(null);
            navigate("/");
        }
    }


    return ( 
        <Navbar bg="black" sticky="top" collapseOnSelect expand="lg" className="pt-0 me-0 pe-0 w-100" >
            <Container fluid className="d-flex justify-content-between">
            <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Col>
                    <Nav
                    className="me-auto my-2 my-lg-0 p-3"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >   
                        <Link className="text-light fw-bold text-decoration-none p-2" to="/" >Home</Link>
                        <Link className="text-light fw-bold text-decoration-none p-2" to="/movies">Movies</Link>
                        {user && <Button variant="none" className="text-light fw-bold text-decoration-none p-2" onClick={handleShow} >Friends</Button>}
                        {(user && user.admin === 1) && <Link className="text-light fw-bold text-decoration-none p-2" to="/movies/addMovie">Add Movie</Link>}
                        {(user && user.admin === 1) && <Link className="text-light fw-bold text-decoration-none p-2" to="/carousel">Edit Carousel</Link>}

                    </Nav>
                    </Col>
                    <Col>
                    <Navbar.Brand href="/" className="fw-bold ms-5 p-3 text-success m-auto">IsItAnyGood?</Navbar.Brand>
                    </Col>
                    <Col className="d-flex col-3 justify-content-end align-items-center">
                        {!user && <Link className="text-light fw-bold text-decoration-none p-2" to="/login" >Log In</Link>}
                        {!user && <Link className="text-light fw-bold text-decoration-none p-2" to="/register" >Register</Link>}
                        {user && <Link className="text-light fw-bold text-decoration-none p-2" to="/profile">{user.username}</Link>}
                        {user && <Button variant="none" className="text-light fw-bold text-decoration-none p-2" onClick={logout}>Log Out</Button>}
                    </Col>
                </Navbar.Collapse>
            </Container>
            { user && 
            <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fs-3">Friendlist</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="mb-3 fs-3 ">
                    <Button variant="none" className="btn fs-4" onClick={handleShowModal}><i class="bi bi-person-plus-fill" >
                        </i> <span className="fs-5">Add new</span>
                    </Button>
                </div>
                <Form>
                <div className="input-group">
                    <input type="text" className="form-control h-75" id="search" 
                    placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                </Form>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add a New Friend</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Friend Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Spiderman"
                            autoFocus
                            value={toAdd}
                            onChange={(e) => setToAdd(e.target.value)}
                        />
                        </Form.Group>
                        {addError && <div style={{color:"red"}}>
                                    *An account with that username does not exist. Try again!
                                    </div>}
                        {userError && <div style={{color:"red"}}>
                        *Can not add yourself as a friend
                        </div>}
                    </Form>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                    <Button variant="primary" onClick={handleAddFriend}>
                        Add Friend
                    </Button>
                    </Modal.Footer>
                </Modal>

                {dispFriend && dispFriend.map( (friend, index) => (
                   <>
                   {(index % 2 === 0) &&
                    <div className="d-flex flex-row text-dark my-3 friend1 fs-4 align-items-center">
                        <div className="col-lg-6">
                            {friend.username}
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end">
                        <Link to={`/profile/viewProfile/${friend.f2_id}`} className="friend-link align-self-center">
                            <i class="bi bi-person-lines-fill fs-3 "></i>
                        </Link>
                        <Button variant="none" id={`${friend.f2_id}`} onClick={handleDeleteFriend}> 
                            <i class="bi bi-x fs-3"></i>
                        </Button>
                        </div>
                    </div>
                    }
                    {(index % 2 === 1) && 
                    <div className="d-flex flex-row text-dark my-3 friend2 fs-4 align-items-center">
                        <div className="col-lg-6">
                            {friend.username}
                        </div>
                        <span className="d-flex col-lg-6 justify-content-end">
                        <Link to={`/profile/viewProfile/${friend.f2_id}`} className="friend-link align-self-center">
                            <i class="bi bi-person-lines-fill fs-3"></i>
                        </Link>
                        <Button variant="none" id={`${friend.f2_id}`} onClick={handleDeleteFriend}>
                            <i class="bi bi-x fs-3"></i>
                        </Button>
                        </span>
                    </div>
                    }
                    </>
                ))}

            </Offcanvas.Body>
            </Offcanvas>
        }
        </Navbar>


     );
}
 
export default NavBar;