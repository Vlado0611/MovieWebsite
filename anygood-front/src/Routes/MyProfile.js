import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Tab, Tabs} from "react-bootstrap";
import useFetch from "../Utilities/useFetch";
import {Link} from 'react-router-dom';
import Image from "react-bootstrap/Image";
import ReactPaginate from 'react-paginate';


const MyProfile = () => {
    const loggedInUser = localStorage.getItem("user");
    const user = JSON.parse(loggedInUser);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [comments, setComments] = useState(null);

    const {data: profile, isPending, error} = useFetch(`http://localhost:3001/accounts/${user.id}`);
    const {data, isPendingComm, errorComm} = useFetch(`http://localhost:3001/comments/accounts/${user.id}`);
    const {data: movies, isPendingMovies, errorMovies} = useFetch(`http://localhost:3001/favorite/${user.id}`);

    useEffect(() => {
        if(profile){
            setUsername(profile[0].username);
            setName(profile[0].name);
            setSurname(profile[0].surname);
            setImage(profile[0].profileImage);
            setDescription(profile[0].description);
        }
    }, [profile]);

    useEffect( () => {
        const getData = async () => {
            setPageCount(Math.ceil(data.length/perPage));
            setComments(data.slice(offset, offset+perPage));
        }
        if(data){
            getData();
        }
    }, [data, offset]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset((selectedPage) * perPage);
    }

    return ( 
        <Container>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {profile &&
            <div className="d-flex mx-4 mt-4 flex-wrap profile-header">
                <Row className="mx-4 mt-4 col-lg-12">
                    <Col className="col-lg-2 mx-5">
                        {image && <Image src={`http://localhost:3001/images/${image}`} roundedCircle width={"200px"} height={"200px"}/> }
                    </Col>
                    <Col className="col-lg-5 align-self-center">
                        <h1 className="fw-bold justify-self-center">{username}</h1>
                        <h4 className="fw-bold">{name} {surname}</h4>
                    </Col>
                    <Col className="text-end align-self-end mx-5 mb-2">
                       <Link to={`/profile/editProfile`}><button className="btn btn-primary">Edit profile <i className="bi bi-pencil-fill m-2" ></i></button></Link>
                    </Col>
                    <hr></hr>
                </Row>
                <Row className="mx-4 col-lg-10">
                    <Tabs defaultActiveKey="aboutMe" className="mb-3 profile-tabs">
                        <Tab eventKey="movies" title="Movies">
                            {isPendingMovies && <div>Loading...</div>}
                            {errorMovies && <div>{errorMovies}</div>}
                            <div className="d-flex m-2 mb-4 flex-wrap">
                            {movies && movies.map( (movie) => (
                                <span className="col-lg-2 mx-3">
                                    <Link to={`/movies/${movie.id}`} className="text-decoration-none">
                                        <Image src={`http://localhost:3001/images/${movie.filename}`} width={"150px"} height={"250px"}/>
                                    </Link>
                                </span>
                                
                            ))} 
                            </div>
                        </Tab>
                        <Tab eventKey="comments" title="Comments">
                            {isPendingComm && <div>Loading...</div>}
                            {errorComm && <div>{errorComm}</div>}
                            {comments && 
                                <div>
                                {comments.map( (comment) => (
                                <Link to={`/movies/${comment.movie_id}`} className="text-decoration-none">
                                <div className="border rounded-1 border-dark m-3 p-2 profile-comment">
                                    <h3 style={{color:"green"}}>{comment.title}</h3>
                                    <h5 className="fs-6"><span className="text-light">For: </span>{comment.movieTitle}</h5>
                                    <h5 className="fs-6"><span className="text-light">On: </span>{comment.dateCreated.split('T')[0]}</h5>
                                    <p>{comment.description}</p>
                                </div>
                                </Link>
                                ))}
                                <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
            />
                            </div>} 
                        </Tab>
                        <Tab eventKey="aboutMe" title="About Me">
                            <div>
                                <p className="profile-description">{description}</p>
                            </div>
                        </Tab>
                    </Tabs>
                </Row>
            </div>
            }      
        </Container>
            
     );
}
 
export default MyProfile;