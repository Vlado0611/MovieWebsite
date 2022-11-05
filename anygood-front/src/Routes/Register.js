import { Form, FormControl, InputGroup } from "react-bootstrap";
import "../index.css"
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [gender, setGender] = useState("Male");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("default-user.jpg");
    const [description, setDescription] = useState("");
    const inputFile = useRef(null);
    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`http://localhost:3001/images/default-user.jpg`)
            .then( (response) => {
                setFile(response.data);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        if(fileName){

        const formData = new FormData();

        formData.append("file", file);
        axios.post("http://localhost:3001/upload", formData )
            .then( (response) => {
                let realFileName = response.data.filename;
                axios.post("http://localhost:3001/accounts", {
                    username: username,
                    email: email,
                    password: password,
                    name: firstName,
                    surname: lastName,
                    gender: gender,
                    description: description,
                    admin: 0,
                    filename: realFileName
                }).then((response) => {
                    setIsPending(false); 
                    navigate("/");
                })
            })
            .catch((error) => {
                console.log(error);
                alert("Registration unsuccessful");
                setIsPending(false);
            })  
        }
        else {
            axios.post("http://localhost:3001/accounts", {
                    username: username,
                    email: email,
                    password: password,
                    name: firstName,
                    surname: lastName,
                    gender: gender,
                    description: description,
                    admin: 0,
                    filename: fileName
                }).then((response) => {
                    setIsPending(false); 
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Registration unsuccessful");
                    setIsPending(false);
                })  
                
        }
    }

    const fileChangedHandler = (event) => {
        let file = event.target.files[0];

        if (file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
                setFileName(file.name);
                setFile(event.target.files[0]);
        }else {
            alert("Please enter a .jpg or a .png image!")
            event.target.value = null;
            return false;
        }
        if (file.size > 10e6) {
          window.alert("Please upload a file smaller than 10 MB");
          event.target.value = null;
          return false;
        }
      };

    const clearImage = (event) => {
        event.preventDefault();
        setFile(null);
        setFileName("default-user.jpg");
        inputFile.current.value = null;
    }


    return ( 
        <div className="container-lg my-auto text-center mt-5 auth-form">
            <h2 class="fw-bold text-light">Join Our Community!</h2>
            <Form className="d-block auth-form" onSubmit={handleSubmit}>
                <label class="text-light mt-3 p-1">First Name:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-person"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="text"
                    placeholder="e.g. Peter"
                    aria-label="fName"
                    required
                    value={firstName}
                    onChange={ (e) => setFirstName(e.target.value)}
                    />
                </InputGroup>
                <label class="text-light mt-3 p-1">Last Name:</label>
                <InputGroup>
                    <InputGroup.Text>
                            <i className="bi bi-person"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="text"
                    placeholder="e.g. Parker"
                    aria-label="lName"
                    required
                    value={lastName}
                    onChange={ (e) => setLastName(e.target.value)}
                    />
                </InputGroup>

                <label class="text-light mt-3 p-1">Username:</label>
                <InputGroup>
                    <InputGroup.Text>
                            <i className="bi bi-person-fill"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="text"
                    aria-label="username"
                    required
                    placeholder="e.g. Spiderman"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
                    />
                </InputGroup>

                <label class="text-light mt-3 p-1">Email address:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-envelope"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="email"
                    placeholder="e.g. peterparker@example.com"
                    aria-label="email"
                    required
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <label class="text-light mt-3 p-1">Password:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="password"
                    aria-label="password"
                    required
                    placeholder="e.g. definitelyNotSpiderman123"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="text-light mt-3 p-1">About me: </Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="text-light mt-3 p-1">Image:</Form.Label>
                    <Form.Control type="file" 
                    ref={inputFile}
                    onChange={fileChangedHandler}
                    />
                    <div className="text-start my-2">
                        <button className="btn btn-danger" type="button" onClick={clearImage}>Reset Image</button>
                    </div>
                </Form.Group>
                <label class="text-light mt-3 p-1 gender">Gender:</label>
                <Form.Select aria-label="Default select example" 
                value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Select>
                <div class="d-block text-center mt-4">
                {!isPending && <button className="btn btn-secondary" type="submit" >Register</button>}
                {isPending && <button className="btn btn-secondary" disabled>Processing...</button>}
                </div>

            </Form>

        </div>
     );
}
 
export default Register;