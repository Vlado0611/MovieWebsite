import { Form, FormControl, InputGroup } from "react-bootstrap";
import "../index.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from "jwt-decode";

const LogIn = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        axios.post("http://localhost:3001/login", {
            username,
            password
        }).then(res => {
            if(res.status === 200){
                localStorage.setItem('token', res.data.token);
                
                const decode = jwtDecode(res.data.token);
                const user = {id: decode.id, admin: decode.admin, username: decode.username};
                localStorage.setItem('user', JSON.stringify(user));
                props.setUser(user);
                props.setIsLoggedIn(true);
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Invalid username or password !");
        })
        ;
        setIsPending(false);
    }

    return ( 
        <div className="container-lg my-auto text-center mt-5 auth-form">
            <h2 class="fw-bold text-light">Log In!</h2>
            <Form className="d-block auth-form" onSubmit={handleSubmit}>
                    <label class="text-light mt-3 p-1">Username:</label>
                    <InputGroup>
                        <InputGroup.Text>
                            <i class="bi bi-person-fill"></i>
                        </InputGroup.Text>
                        <FormControl
                        type="text"
                        placeholder="e.g. Spiderman"
                        aria-label="username"
                        required
                        value={username}
                        onChange={ (e) => setUsername(e.target.value)}
                        />
                    </InputGroup>
                <label class="text-light mt-3 p-1">Password:</label>
                <InputGroup>
                    <InputGroup.Text>
                        <i class="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <FormControl
                    type="password"
                    aria-label="password"
                    required
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <div class="d-block text-center mt-4">
                {!isPending && <button class="btn btn-secondary">Log In</button>}
                {isPending && <button class="btn btn-secondary" disabled>Processing...</button>}
                </div>

            </Form>

        </div>
     );
}
 
export default LogIn;