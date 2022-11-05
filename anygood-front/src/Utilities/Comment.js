import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import axios from "axios";

const Comment = (props) => {
    const comment = props.comment;
    const number = props.number;
    const [classVar, setClassVar] = useState(null);
    const [dispStars, setDispStars] = useState(null);
    const user = props.user;

    useEffect( () => {
        if(number%2 === 0){
            setClassVar("comment-light mx-5 my-3 p-3 comment"); 
        }
        else {
            setClassVar("comment-dark mx-5 my-3 p-3 comment");
        }
    }, []) 

    useEffect( () => {
        let starArr = [];
        for(let i = 0; i < comment.stars_no; i++){
            starArr.push(i);
        }

        setDispStars(
            starArr.map( () => (
                <i className='bi bi-star-fill m-1 comment-star'></i>
            ))
        )
    }, [comment]);

    const handleDelete = (e) => {
        window.location.reload(false);
        axios.delete(`http://localhost:3001/comments/${comment.comment_no}`)
            .catch((error) => {
                console.log(error);
            })
    }

    return ( 
        <div className={`${classVar} d-flex text-decoration-none text-dark`}>
        <Link className="d-flex flex-row col-lg-11 text-decoration-none text-dark" to={
            (user ? (user.id !== comment.account_id ? `/profile/viewProfile/${comment.account_id}` : `/profile`) 
            : `/profile/viewProfile/${comment.account_id}`) 
        } style={{zIndex:"1"}}>
            <div className="d-flex col-lg-1">
                <Image src={`http://localhost:3001/images/${comment.profileImage}`} roundedCircle width={"70px"} height={"70px"}/>
            </div>

            <div className="d-flex flex-column col-lg-10">
                <h4 className="mb-0">{comment.title}</h4>
                <h5>{dispStars}</h5>
                <small className="mt-0">By {comment.username}</small>
                <p className="mt-3">{comment.description}</p>
            </div>
        </Link>
            {((user && user.id === comment.account_id) || (user && user.admin === 1)) &&
            <div className="col-lg-1 d-flex justify-content-end">
                { (user && user.id === comment.account_id) && <Link to={`/movies/${comment.movie_id}/editComment/${comment.comment_no}`} className="text-black"><i class="bi bi-pencil-square fs-3"></i></Link>}
                <span className="ms-3" onClick={handleDelete}><i class="bi bi-x-circle fs-3 delete-comment" ></i></span>
            </div>
            }
        
        </div>
     );
}
 
export default Comment;