import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const CarouselItem = (props) => {
    let item = props.item;
    const [order, setOrder] = useState(item.order_no);
    const [file, setFile] = useState(null);
    const [fileChanged, setFileChanged] = useState(false);
    const [movie, setMovie] = useState(item.movie_id);
    const [movies, setMovies] = useState(null);
    const [dispMovies, setDispMovies] = useState(null);

    useEffect( () => {
        axios.get(`http://localhost:3001/movies`)
            .then( (response) => {
                setMovies(response.data);
            })
            .catch( (error) => {
                console.log(error);
            })
    }, [item]);

    useEffect( () => {
        if(movies){
        setOrder(item.order_no);
        setMovie(item.movie_id);
        setDispMovies(movies.map( (movie) => (
            <>
            {movie.id === item.movie_id ? <option selected value={`${movie.id}`}> {movie.title} </option>
            : <option value={`${movie.id}`}> {movie.title} </option>}
            </>
        )))
        }
    }, [movies]);

    const fileChangedHandler = (event) => {
        let file = event.target.files[0];

        if (file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
                setFile(event.target.files[0]);
                setFileChanged(true);
        }else {
            alert("Please enter a .jpg or a .png image!")
            event.target.value = null;
            setFileChanged(false);
            return false;
        }
        if (file.size > 10e6) {
          window.alert("Please upload a file smaller than 10 MB");
          event.target.value = null;
          setFileChanged(false);
          return false;
        }
      };

    const handleSave = (e) => {
        e.preventDefault();

        if(fileChanged){
            const formData = new FormData();

            formData.append("file", file);
            axios.post("http://localhost:3001/upload", formData )
                .then( (response) => {
                    let realFileName = response.data.filename;
                    axios.put(`http://localhost:3001/carousel/${item.movie_id}`, {
                        movie_id: movie,
                        order_no: order,
                        filename: realFileName
                    }).then((response) => {
                        props.setChanged(props.changed+1);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })  
            }
            else {
                axios.put(`http://localhost:3001/carousel/${item.movie_id}`, {
                        movie_id: movie,
                        order_no: order,
                        filename: item.filename
                    }).then((response) => {
                        props.setChanged(props.changed+1);

                    })
                    .catch((error) => {
                        console.log(error);
                    })  
                    
            }

    }

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:3001/carousel/${item.movie_id}`)
            .then( (response) => {
                props.setChanged(props.changed+1);
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    return ( 
        <Row>
            <div className="m-3 col-lg-5">
                <Image src={`http://localhost:3001/images/${item.filename}`} width={"500px"} height={"300px"}/>
            </div>
            <div className="col-lg-5 d-flex flex-column">
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="text-light mt-3 p-1">Image:</Form.Label>
                        <Form.Control type="file" 
                        onChange={fileChangedHandler}
                        />
                    </Form.Group>
                </Form>
                <label class="text-light mt-3 p-1">Order:</label>
                <InputGroup>
                    <FormControl
                    type="text"
                    required
                    value={order}
                    onChange={ (e) => setOrder(e.target.value)}
                    />
                </InputGroup>
                <label class="text-light mt-3 p-1">For:</label>
                <Form.Select onChange={(e) => setMovie(e.target.value)}>
                {dispMovies}
                </Form.Select>
            </div>
            <div className="col-lg-1 d-flex flex-column justify-content-center">
                <button className="btn btn-success my-3" onClick={handleSave}>Save</button>
                <button className="btn btn-danger my-3" onClick={handleDelete}>Remove</button>
            </div>
        </Row>

    );
}

export default CarouselItem;