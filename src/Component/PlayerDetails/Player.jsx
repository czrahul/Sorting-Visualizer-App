import React, { useState , useEffect} from "react";
import Topnav from "../topnav/Topnav";
import axios from "axios";

const Player = () => {

    const [sk, setName] = useState("");
    const [pd, setPd] = useState([]);    
    
    async function PostName(e) {
        try {
            await axios.post("http://localhost:4000/post_name", {sk} )

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
        axios.get("http://localhost:4000/home").then(function(response) {
            setPd(response.data);
        })
    }, )
    return () => clearInterval(intervalId); //This is important
    }, [])



    return (
        <div className="player">
            <Topnav/>
            <div className="playerdetail">
                <form id="playerinput" onSubmit={PostName}>
                    <input type="text" value ={sk} onChange={(e) => {setName(e.target.value)}} placeholder="Enter Player Name"/>
                    <button type="submit" >Get</button>
                </form>
            </div>
            Here are the player details:
            {pd.map((ques, i) => 

            <ol><span style = {{fontWeight:"bold"}}>Player Name: </span>{ques.name}
            <ul type="none">
                <li>Experience: {ques.experience}</li>
                <li>Team: {ques.team}</li>
                <li>Rating: {ques.avg_rating}</li>
            </ul><br/>
            </ol>
             ) }
            
        </div>
    )
}
export default Player;
