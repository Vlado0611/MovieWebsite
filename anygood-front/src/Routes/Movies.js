import {Form, Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import useFetch from '../Utilities/useFetch';
import MovieList from '../Utilities/MovieList';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Movies = (props) => {
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState(null);
    const [movies, setMovies] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(null);

    useEffect( () => {
        setIsPending(true);
        axios.get("http://localhost:3001/movies")
            .then( (response) => {
                setData(response.data);
                setIsPending(false);
            })
            .catch ( (error) => {
                console.log(error);
                setError(error);
            })
    }, []);

    
    useEffect( () => {
        const getData = async () => {
            setPageCount(Math.ceil(data.length/perPage));
            setMovies(data.slice(offset, offset+perPage));
        }
        if(data){
            getData();
        }
    }, [data, offset]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset((selectedPage) * perPage);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:3001/movies/search?search=${search}`)
            .then( (response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return ( 
        <Container className='d-flex flex-column'>
            <Row className='m-5'>
                <Col>
                    <Form>
                        <div className="input-group">
                            <span className='input-group-text'>
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" class="form-control" id="search" 
                            placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </div>

                        <div class="mt-3 text-center">
                            <button type='submit' class="btn btn-primary search-button" onClick={handleSearch}>Search</button>
                        </div>
                    </Form>
                </Col>
            </Row>

            {error && <div>{error}</div>}
            {isPending && <div class="text-light text-center">Loading...</div>}
            {movies && <MovieList movies={movies}/>}
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
        </Container>
            
     );
}
 
export default Movies;

            