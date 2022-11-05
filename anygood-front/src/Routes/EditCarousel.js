import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Form, Image, Row } from "react-bootstrap";
import CarouselItem from "../Utilities/CarouselItem";
import { Link } from "react-router-dom";

const EditCarousel = () => {

    const [changed, setChanged] = useState(0);
    const [items, setItems] = useState(null);

    useEffect( () => {
        axios.get("http://localhost:3001/carousel")
            .then( (response) =>{
                setItems(response.data);
            })
            .catch( (error) => {
                console.log(error);
            })
    }, [changed]);

    return ( 
        <>
        {items && 
        <Container>
            <h2 className="m-5 text-center text-light fw-bold">Edit the Carousel</h2>
            <div className="text-center m-3">
            <Link to="/carousel/addNew" ><button className="btn btn-warning">Add New</button></Link>
            </div>
            <div className="d-flex flex-column">
            {items.map( (item) => (
                <CarouselItem item={item} changed={changed} setChanged={setChanged}/>
            ))
            }
            </div>
        </Container>}
        </>
    );
}
 
export default EditCarousel;