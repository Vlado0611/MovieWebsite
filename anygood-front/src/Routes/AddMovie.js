import { useState, useEffect, useRef } from "react";
import { Col, Container, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import useFetch from "../Utilities/useFetch";
import axios from "axios";
import Image from "react-bootstrap/Image";

const AddMovie = () => {

    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [savePending, setSavePending] = useState(false);
    const [fileDataURL, setFileDataURL] = useState(null);

    const inputFile = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setSavePending(true);
        
        const formData = new FormData();
        formData.append("file", file);

        axios.post("http://localhost:3001/upload", formData)
            .then( (response) => {
                let realFileName = response.data.filename;
                axios.post("http://localhost:3001/movies", {
                    title: title,
                    filename: realFileName,
                    description: description,
                    duration: duration,
                    releaseYear: releaseYear 
                })
                .then( () => {
                    setSavePending(false);
                    navigate("/movies");
                })
            })
            .catch( (error) => {
                console.log(error);
                alert("Insert unsuccessful");
                setSavePending(false);
            })
    }

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

    return ( 
        <Container className="form-cont">
        <div className="text-center m-2 ">
                <h2 className="fs-1 fw-bold text-light">Add a Movie</h2>
        </div>
        <div className="d-flex flex-row  m-4">
            
            <Col className="col-lg-8 d-flex justify-content-center">
                <Form className="form-field m-3" onSubmit={handleSubmit}>
                    <label className="text-light fw-bold fs-4">Title:</label>
                    <InputGroup>
                        <InputGroup.Text>
                            
                        </InputGroup.Text>
                        <FormControl 
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="text-light fw-bold fs-4">Description: </Form.Label>
                        <Form.Control as="textarea" rows={5} 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <label className="text-light fw-bold fs-4">Duration:</label>
                    <InputGroup >
                        <InputGroup.Text>
                            
                        </InputGroup.Text>
                        <FormControl 
                        type="text"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        />
                    </InputGroup>

                    <label className="text-light fw-bold fs-4 mt-3" >Release Year:</label>
                    <InputGroup>
                        <InputGroup.Text>
                            
                        </InputGroup.Text>
                        <FormControl 
                        type="text"
                        required
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        />
                    </InputGroup>

                    <Form.Group controlId="formFile" className="my-3">
                        <Form.Label className="text-light fw-bold fs-4">Image:</Form.Label>
                        <Form.Control type="file" 
                        ref={inputFile}
                        onChange={fileChangedHandler}
                        />
                    </Form.Group>

                <div class="d-block text-center my-4">
                    {!savePending && <button className="btn btn-success" type="submit" >Save</button>}
                    {savePending && <button className="btn btn-success" disabled>Processing...</button>}
                </div>
                </Form>
            </Col>

            <Col className="col-lg-4 d-flex flex-column justify-content-center">
                <h3 className="text-light fw-bold fs-4">Preview:</h3>
                <div>
                    <Image src={fileDataURL} height={"400px"} width={"300px"}/>
                </div>
            </Col>
        </div>
        </Container>
     );
}
 
export default AddMovie;