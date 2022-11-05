import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const AddCarouselItem = () => {

    const [order, setOrder] = useState(null);
    const [file, setFile] = useState(null);
    const [movies, setMovies] = useState(null);
    const [dispMovies, setDispMovies] = useState(null);
    const [movie, setMovie] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`http://localhost:3001/movies`)
            .then( (response) => {
                setMovies(response.data);
            })
            .catch( (error) => {
                console.log(error);
            })
    }, []);

    useEffect( () => {
        if(movies){
        setDispMovies(movies.map( (movie) => (
            <>
            <option value={`${movie.id}`}> {movie.title} </option>
            </>
        )))
        }
    }, [movies]);

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
          }
          fileReader.readAsDataURL(file);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [file]);

    const fileChangedHandler = (event) => {
        let file = event.target.files[0];

        if (file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
                setFile(event.target.files[0]);
        }else {
            alert("Please enter a .jpg or a .png image!")
            event.target.value = null;
            setFileDataURL(null);
            return false;
        }
        if (file.size > 10e6) {
          window.alert("Please upload a file smaller than 10 MB");
          event.target.value = null;
          setFileDataURL(null);
          return false;
        }
      };

      const handleAdd = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("file", file);
        axios.post("http://localhost:3001/upload", formData )
            .then( (response) => {
                let realFileName = response.data.filename;
                axios.post(`http://localhost:3001/carousel`, {
                    movie_id: movie,
                    order_no: order,
                    filename: realFileName
                }).then((response) => {
                    navigate("/carousel");
                })
            })
            .catch((error) => {
                console.log(error);
            })  
        }

    return (
        <Container>
            <div>
                <Form>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="text-light mt-3 p-1">Image:</Form.Label>
                        <Form.Control type="file" 
                        onChange={fileChangedHandler}
                        />
                </Form.Group>
                <div className="text-center">
                    {fileDataURL && <Image src={fileDataURL} width={"500px"} height={"300px"}/> }
                </div>
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
                <div className="text-center">
                <button className="btn btn-success btn-lg my-3" onClick={handleAdd}>Save</button>
                </div>
                </Form>
            </div>
        </Container>
    );
} 

export default AddCarouselItem;