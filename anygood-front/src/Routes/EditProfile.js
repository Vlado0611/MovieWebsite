import { useEffect } from "react";
import { useState, useRef } from "react";
import { Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import useFetch from "../Utilities/useFetch";
import axios from "axios";
import Image from "react-bootstrap/Image";

const EditProfile = () => {
    
    const loggedInUser = localStorage.getItem("user");
    const user = JSON.parse(loggedInUser);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [file, setFile] = useState(null);
    const [savePending, setSavePending] = useState(false);
    const [showMyImage, setShowMyImage] = useState(true);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [fileChanged, setFileChanged] = useState(false);

    const inputFile = useRef(null);
    const navigate = useNavigate();

    const {data: profile, isPending, error} = useFetch(`http://localhost:3001/accounts/${user.id}`);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSavePending(true);
        let gender = profile[0].gender;
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        
        if(confPassword !== password){
            alert("Passwords do not match!");
            return;
        }

        if(fileChanged){
        axios.post("http://localhost:3001/upload", formData )
            .then( (response) => {
                let realFileName = response.data.filename;
                let admin = profile[0].admin;
                axios.put(`http://localhost:3001/accounts/${profile[0].id}`, {
                    username: username,
                    email: email,
                    password: password,
                    name: name,
                    surname: surname,
                    gender: gender,
                    description: description,
                    admin: admin,
                    filename: realFileName
                }).then((response) => {
                    navigate("/profile");
                })
            })
            .catch((error) => {
                console.log(error);
                alert("Edit unsuccessful");
                setSavePending(false);
            })   
        }
        else {
            let realFileName = profile[0].profileImage;
            let admin = profile[0].admin;
            axios.put(`http://localhost:3001/accounts/${profile[0].id}`, {
                    username: username,
                    email: email,
                    password: password,
                    name: name,
                    surname: surname,
                    gender: gender,
                    description: description,
                    admin: admin,
                    filename: realFileName
                }).then((response) => {
                    navigate("/profile");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Edit unsuccessful");
                    setSavePending(false);
                })  
        }
    }

    const fileChangedHandler = (event) => {
        let file = event.target.files[0];

        if (file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
                setFile(event.target.files[0]);
                setShowMyImage(false);
                setFileChanged(true);
        }else {
            alert("Please enter a .jpg or a .png image!")
            event.target.value = null;
            setFileDataURL(null);
            setShowMyImage(true);
            setFileChanged(false);
            return false;
        }
        if (file.size > 10e6) {
          window.alert("Please upload a file smaller than 10 MB");
          event.target.value = null;
          setFileDataURL(null);
          setShowMyImage(true);
          setFileChanged(false);
          return false;
        }
      };

    useEffect(() => {
        if(profile){
            setUsername(profile[0].username);
            setName(profile[0].name);
            setSurname(profile[0].surname);
            setImage(profile[0].profileImage);
            setDescription(profile[0].description);
            setEmail(profile[0].email);
            setPassword(profile[0].password);
            setConfPassword(profile[0].password);
        }
    }, [profile]);

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
        <Container>
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div>}
            { profile && 
            <div className="d-flex flex-wrap profile-edit justify-content-center m-4">
                <Row className="col-12 text-center m-3">
                    <h2 className="fw-bold">Edit your profile !</h2>
                </Row>
                <Form className="d-block edit-form" onSubmit={handleSubmit}>
                <label class="text-dark mt-3 p-1">First Name:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-person"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="text"
                    aria-label="fName"
                    required
                    value={name}
                    onChange={ (e) => setName(e.target.value)}
                    />
                </InputGroup>
                <label class="text-dark mt-3 p-1">Last Name:</label>
                <InputGroup>
                    <InputGroup.Text>
                            <i className="bi bi-person"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="text"
                    aria-label="lName"
                    required
                    value={surname}
                    onChange={ (e) => setSurname(e.target.value)}
                    />
                </InputGroup>

                <label class="text-dark mt-3 p-1">Username:</label>
                <InputGroup>
                    <InputGroup.Text>
                            <i className="bi bi-person-fill"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="text"
                    aria-label="username"
                    required
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
                    />
                </InputGroup>

                <label class="text-dark mt-3 p-1">Email address:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-envelope"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="email"
                    aria-label="email"
                    required
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <label class="text-dark mt-3 p-1">Password:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="password"
                    aria-label="password"
                    required
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    />
                </InputGroup>

                <label class="text-dark mt-3 p-1">Confirm password:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="password"
                    aria-label="password"
                    required
                    value={confPassword}
                    onChange={ (e) => setConfPassword(e.target.value)}
                    />
                </InputGroup>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="text-dark mt-3 p-1">About me: </Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="text-dark mt-3 p-1">Image:</Form.Label>
                    <Form.Control type="file" 
                    ref={inputFile}
                    onChange={fileChangedHandler}
                    />
                </Form.Group>
                <div className="text-center">
                    {(showMyImage && image) && <Image src={`http://localhost:3001/images/${image}`} roundedCircle width={"200px"} height={"200px"}/> }
                    {!showMyImage && <Image src={fileDataURL} roundedCircle width={"200px"} height={"200px"}/> }
                </div>
                <div class="d-block text-center my-4">
                {!savePending && <button className="btn btn-success" type="submit" >Save</button>}
                {savePending && <button className="btn btn-success" disabled>Processing...</button>}
                </div>

            </Form>

            </div>}
        </Container>
     );
}
 
export default EditProfile;