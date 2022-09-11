import React, { useState } from "react";
import Topnav from "../topnav/Topnav";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import "./playerrating.css"



const PlayerRating = () => {
    const [skey, setName] = useState("");
    const [rate, setRate] = useState(0);
    
    async function PostRate(e) {
        try {
            await axios.post("http://localhost:4000/post_rate", {skey, rate} )
        } catch (error) {
            console.error(error)
        }
    }
   
    return (
        <div className="rating">
            <Topnav/>
            <div className="ratingdetail">
                <form id="ratinginput" onSubmit={PostRate}>
                    <input type="text" value ={skey} onChange={(e) => {setName(e.target.value)}} placeholder="Enter Player Name"/>
                    <div className="rate">         
                    <Container>
                      {[...Array(10)].map((item, index) => {
                        const givenRating = index + 1;
                        return (
                          <label>
                            <Radio
                              type="radio"
                              value={givenRating}
                              onClick={() => {
                                setRate(givenRating);
                                alert(`Are you sure you want to give ${givenRating} stars ?`);
                              }}
                            />
                            <Rating>
                              <FaStar
                                color={
                                  givenRating < rate || givenRating === rate
                                    ? "000"
                                    : "rgb(192,192,192)"
                                }
                              />
                            </Rating>
                          </label>
                        );
                      })}
                    </Container>
                    </div>  
                    <button type="submit" id="ratebutton">Rate</button>
                </form>
            </div>
            
        </div>
    )
}
export default PlayerRating;
