import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
//import MovieMap from './MovieMap'
const MovieList = (props) => {
    const movies = props.movies;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);  
          setUser(foundUser);
        }
      }, []);

    return ( 
        <div>
            {movies.map( (movie) => (
                <Link to={`/movies/${movie.id}`} className="text-decoration-none">
                    <Row className="m-3 list-card-member">
                        <Col className='list-card-image col-lg-3 d-inline'>
                            <img src={`http://localhost:3001/images/${movie.filename}`} alt="" />
                        </Col>
                        <Col className="col-lg-9 d-flex flex-wrap justify-content-center">
                            <div className="w-75 d-inline">
                                <h2 className="fw-bold text-light text-center">{movie.title} ({movie.releaseYear})</h2>
                            </div>
                            {(user && user.admin === 1 ) &&<div className="w-25 d-inline text-end ">
                                <Link to={`/movies/editMovie/${movie.id}`}><i className="bi bi-pencil-fill fs-2 edit-movie"></i></Link>
                            </div>}
                            <p className="fw-bold text-light mt-5 lead"><span className="text-danger ">Plot: </span>{movie.description}</p>
                        </Col>
                    </Row>
                </Link>
            ))}
        </div>
     );
}
 
export default MovieList;