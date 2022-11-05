import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import CommentList from "./CommentList";
import "../index.css"
import {Container, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";


const Comments = () => {

    const params = useParams();
    const {data: movie, isPending, error} = useFetch(`http://localhost:3001/movies/${params.id}`)
    const [user, setUser] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);  
          setUser(foundUser);
        }
      }, []);

    useEffect( () => {
        const loggedInUser = localStorage.getItem("user");
        let foundUser;
        if (loggedInUser) {
          foundUser = JSON.parse(loggedInUser);  
        }
        if(loggedInUser){
        axios.get(`http://localhost:3001/favorite?account_id=${foundUser.id}&movie_id=${params.id}`)
        .then( (response) => {
            let star = document.getElementById("star");
            if(response.data.length === 0){
                star.className = "bi bi-star";
            }
            else {
                setIsFavorite(true);
                star.className = "bi bi-star-fill";
            }
        })
        .catch( error => {
            console.log(error);
        })
        }
    }, [isFavorite]);



    const handleFavorite = (event) => {
        event.preventDefault();

        if(isFavorite){
            axios.delete(`http://localhost:3001/favorite?account_id=${user.id}&movie_id=${params.id}`)
            .then( () => {
                setIsFavorite(false);
            });
        }
        else {
            axios.post(`http://localhost:3001/favorite`, {
                account_id: user.id,
                movie_id: params.id
            }).then( () => {
                setIsFavorite(true);
            })
        }
        
    }

    return (
        <Container>
            {isPending && <div class="text-light text-center">Loading...</div>}
            {error && <div>{error}</div>}
            {movie && <div className="comments-card">
                        <Row className="m-3">
                            <Col className='list-card-image col-lg-3 d-inline'>
                                <img src={`http://localhost:3001/images/${movie.filename}`} alt="" />
                            </Col>
                            <Col className="col-lg-9 d-flex flex-wrap justify-content-center">
                                <div className="w-75 d-inline text-center">
                                    <h2 className="fw-bold text-dark d-inline movie-title">{movie.title} ({movie.releaseYear})</h2>
                                </div>
                                <div className="d-inline text-end w-25 fs-3 fav-star">
                                    <i className="bi bi-star" id="star" onClick={handleFavorite}></i>
                                </div>
                                <div>
                                    <p className="fw-bold text-dark mt-5 lead"><span className="text-danger ">Plot: </span>{movie.description}</p>
                                </div>
                                <div className="text-start w-100">
                                    <p className="fw-bold text-dark lead"><span className="text-danger ">Duration: </span>{movie.duration}</p>
                                </div>
                                { !user && <Link className="btn fw-bold mt-5 add-comment" to={`/login`} style={{fontSize: "1.5rem"}}>
                                    <i className="bi bi-plus-circle-fill m-2" ></i><span>Add Comment</span>
                                </Link>}
                                { user && <Link className="btn fw-bold mt-5 add-comment" to={`/movies/${movie.id}/addComment`} style={{fontSize: "1.5rem"}}>
                                    <i className="bi bi-plus-circle-fill m-2" ></i><span>Add Comment</span>
                                </Link>}
                            </Col>
                        </Row>
                        <CommentList movie={movie} user={user} className="mt-3"/>

                    </div>   
                    }
        </Container>
     );
}
 
export default Comments;