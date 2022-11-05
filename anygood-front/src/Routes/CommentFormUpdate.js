import { useState } from 'react';
import { useParams } from "react-router";
import { Container, Form, FormControl, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetch from "../Utilities/useFetch";
import { useEffect } from 'react';

const CommentForm = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [starNo, setStarNo] = useState(0);
    const [description, setDescription] = useState("");
    const {data: comment, isPending, error} = useFetch(`http://localhost:3001/comments/${params.id}`);

    //let movie_id = params.id;
    let user = localStorage.getItem("user");
    const loggedInUser = JSON.parse(user);
    //const account_id = loggedInUser["id"].toString();

    const highlightStars = (value) => {
        for(let i = 0; i < value; i++){
            let star = document.getElementById(i+1);
            star.className = 'bi bi-star-fill m-1 comment-star-hovered';
        }
        setStarNo(value);

        for(let i = value; i < 5; i++){
            let star = document.getElementById(i+1);
            star.className = 'bi bi-star-fill m-1 comment-star';
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let stars_no = starNo.toString();
        let movie_id = comment[0].movie_id;
        let account_id = comment[0].account_id;

        axios.put(`http://localhost:3001/comments/${params.id}`, {
            movie_id,
            account_id,
            stars_no,
            title,
            description
        })
        .then(() => {
            console.log("sfrgjia");
            navigate(`/movies/${params.movie_id}`);
        })
    }
    
    useEffect(() => {
        if(comment){
            setTitle(comment[0].title);
            highlightStars(comment[0].stars_no);
            setDescription(comment[0].description);
        }
    }, [comment])
    
    return ( 
        <Container>
        {isPending && <div class="text-light text-center">Loading...</div>}
        {error && <div>{error}</div>}
        {comment && <div className="container-lg my-auto text-center mt-5 comment-form">
            <h2 class="fw-bold text-light p-3">Edit your comment!</h2>
            <Form className="d-block auth-form" onSubmit={handleSubmit}>
                    <label class="text-light mt-3 p-1">Title:</label>
                    <InputGroup>
                        <InputGroup.Text>
                            <i class="bi bi-person-fill"></i>
                        </InputGroup.Text>
                        <FormControl
                        type="text"
                        placeholder="e.g. So Cool!"
                        aria-label="Title"
                        required
                        value={title || ""}
                        onChange={ (e) => setTitle(e.target.value)}
                        className="p-2"
                        />
                    </InputGroup>
                <div className='comment-stars'>
                    <button onClick={(e) => {e.preventDefault(); return highlightStars(1);}}><i className='bi bi-star-fill m-1 comment-star' id='1'></i></button>
                    <button onClick={(e) => {e.preventDefault(); return highlightStars(2);}}><i className='bi bi-star-fill m-1 comment-star' id='2'></i></button>
                    <button onClick={(e) => {e.preventDefault(); return highlightStars(3);}}><i className='bi bi-star-fill m-1 comment-star' id='3'></i></button>
                    <button onClick={(e) => {e.preventDefault(); return highlightStars(4);}}><i className='bi bi-star-fill m-1 comment-star' id='4'></i></button>
                    <button onClick={(e) => {e.preventDefault(); return highlightStars(5);}}><i className='bi bi-star-fill m-1 comment-star' id='5'></i></button>
                </div>

                <label class="text-light mt-3 p-1">Text:</label>
                <InputGroup>
                    <FormControl
                    as="textarea"
                    rows={8}
                    aria-label="text"
                    required
                    placeholder="some text..."
                    value={description}
                    onChange={ (e) => setDescription(e.target.value)}
                    className="p-2"
                    />
                </InputGroup>
                <div class="d-block text-center mt-4">
                <button class="btn btn-warning" onClick={handleSubmit}>Submit</button>
            </div>

            </Form>
        </div>
        }
    </Container>
     );
}

export default CommentForm;