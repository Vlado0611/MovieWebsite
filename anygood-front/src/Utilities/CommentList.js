import useFetch from "./useFetch";
import Comment from "./Comment";
import {useState, useEffect} from "react";
import ReactPaginate from 'react-paginate';

const CommentList = (props) => {
    const movie = props.movie;
    const user = props.user;
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [comments, setComments] = useState(null);
    const {data, isPending, error} = useFetch(`http://localhost:3001/comments/movies/${movie.id}`);


    useEffect( () => {
        const getData = async () => {
            setPageCount(Math.ceil(data.length/perPage));
            setComments(data.slice(offset, offset+perPage));
        }
        if(data){
            getData();
        }
    }, [data, offset]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset((selectedPage) * perPage);
    }

    return ( 
        <div className="mt-5">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {comments && comments.map( (comment, index) => (
                <div>
                    {/*comment.movie_id === movie.id && <Comment comment={comment} number={index}/>*/}
                    <Comment comment={comment} user={user} number={index}/>
                </div>
            ))}
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
        </div>
     );
}
 
export default CommentList;