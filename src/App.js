import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Player from "./Component/PlayerDetails/Player";
import Topnav from "./Component/topnav/Topnav";
import PlayerRating from "./Component/Rating/PlayerRating";


function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/">
                        <Route index element={<Topnav/>}/>                            
                        <Route path="home" element={<Home/>}/>
                        <Route path="player" element={<Player/>}/>
                        <Route path="rating" element={<PlayerRating/>}/>
                        {/* <Route path="player" element={<Player/>}/> */}

                        {/* <Route path="home" element={<Home/>} />
                        <Route path="users">
                            <Route index element={<List/>}/>                            
                                <Route path="new" element={<New/>}/> */}
                        {/* </Route> */}
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;