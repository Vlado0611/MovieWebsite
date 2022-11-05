import {Carousel, Container, Row, Col} from 'react-bootstrap';
import "../index.css"
import useFetch from "../Utilities/useFetch";
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Home = () => {
    const {data: movies, isPending, error} = useFetch("http://localhost:3001/carousel");
    const {data: trending, isPendingT, errorT} = useFetch("http://localhost:3001/movies/trending");
    const [currInd, setCurrInd] = useState(0);
    const [goalInd, setGoalInd] = useState(4);  
    const [dispTrending, setDispTrending] = useState(null);

    const handleLeft = (e) => {
        e.preventDefault();
        console.log(trending);
        if(currInd != 0){
            setCurrInd(currInd-4);
            setGoalInd(goalInd-4);
        }
    }

    const handleRight = (e) => {
        e.preventDefault();
        console.log(trending);
        if(trending.length - goalInd  > 0){
            setCurrInd(currInd+4);
            setGoalInd(goalInd+4);
        }
    }

    useEffect( () => {
        if(trending){
            setDispTrending(trending.slice(currInd,goalInd).map( (movie) => (
                <span className='home-slider'>
                    <Link to={`/movies/${movie.id}`}><img src={`http://localhost:3001/images/${movie.filename}`} alt="" /></Link>
                </span>
        )))}
    }, [trending, currInd]);

    return (
        
        <Container className="ms-0 me-0">
            {error && <div>{error}</div>}
            {isPending && <div class="text-light text-center">Loading...</div>}
            {movies && 
            <Row className='d-flex' >
                <Col className='col-lg-12'>
                    <Carousel>
                    {movies.map( (movie) => (
                        <Carousel.Item className='h-100'>
                        <img
                        className="d-block w-100 h-100"
                        src={`http://localhost:3001/images/${movie.filename}`}
                        alt="Slide"
                        />
                        <Carousel.Caption className='text-center'>
                            <div>
                                <Link className="carousel-button p-4 text-decoration-none" to={"/movies/"+movie.movie_id}>See more</Link>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                    </Carousel>
                </Col>
            </Row>
            }
            
            <Row className='d-flex ms-5 mt-5 w-100'>
                <h3 className='fw-bold text-light'>Trending:</h3>
                    <div className='d-flex'>
                        <div className='text-center' style={{position:"relative", left:"4%"}} >
                            {errorT && <div>{error}</div>}
                            {isPendingT && <div class="text-light text-center">Loading...</div>}
                            {trending && 
                            <div className='d-flex justify-content-around trending-container'>
                                {dispTrending}
                            </div>
                            }
                            
                            <span className='col-2 slider-button-left fw-bold fs-2'>
                                <button className='btn btn-outline-success' onClick={handleLeft}>&lt;</button>
                            </span>

                            <span className='col-2 slider-button-right fw-bold fs-2'>
                                <button className='btn btn-outline-success' onClick={handleRight}>&gt;</button>
                            </span>
                        </div>
                        
                    </div>

            </Row>
            
        </Container>
        
      );

}
 
export default Home;