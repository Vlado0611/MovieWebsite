import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Routes/NavBar";
import "./index.css";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import LogIn from "./Routes/LogIn";
import Movies from "./Routes/Movies";
import Details from "./Utilities/Details";
import MyProfile from "./Routes/MyProfile";
import CommentFormCreate from "./Routes/CommentFormCreate";
import CommentFormUpdate from "./Routes/CommentFormUpdate";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProfile from "./Routes/EditProfile";
import AddMovie from "./Routes/AddMovie";
import EditMovie from "./Routes/EditMovie";
import ViewProfile from "./Routes/ViewProfile";
import EditCarousel from "./Routes/EditCarousel";
import AddCarouselItem from "./Routes/AddCarouselItem";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        
        setUser(foundUser);
        setIsLoggedIn(true);
      }
    }, []);
    // useEffect(() =>{
    //   localStorage.clear();
    // }, []);

  return (
    <Router>
        <div className="App">
          <NavBar isLoggedIn={isLoggedin} setIsLoggedIn={setIsLoggedIn}/>
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/movies" element={<Movies/>}/>
              <Route path="/login" element={<LogIn setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/movies/:id" element={<Details/>}/>
              <Route path="/movies/:id/addComment" element={<CommentFormCreate/>}/>
              <Route path="/movies/:movie_id/editComment/:id" element={<CommentFormUpdate/>}/>
              <Route path="/profile" element={<MyProfile/>}/>
              <Route path="/profile/editProfile" element={<EditProfile/>}/>
              <Route path="/movies/addMovie" element={<AddMovie/>}/>
              <Route path="/movies/editMovie/:id" element={<EditMovie/>}/>
              <Route path="/profile/viewProfile/:id" element={<ViewProfile/>}/>
              <Route path="/carousel" element={<EditCarousel/>}/>
              <Route path="/carousel/addNew" element={<AddCarouselItem/>}/>
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
