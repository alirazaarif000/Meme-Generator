import React, {useState, useEffect}from "react"
//import Memedata from "../memesData"
export default function Meme(){
    const [meme, setMeme]=useState({
        topText:"", 
        bottomText: "", 
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })
    const [allMeme, setAllMeme]= useState([])
    function getMemeImage(){
        const randomNumber= Math.floor(Math.random()* allMeme.length)
        const memeUrl= allMeme[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage: memeUrl
        }))
    }
    useEffect(()=>{
        fetch("https://swapi.dev/api/people/1")
        .then(res=>res.json())
        .then(memeData=>setAllMeme(memeData.data.meme))
    })
    function handleChange(event){
        const {name, value}= event.target
        setMeme(prevMeme=>(
            {...prevMeme,
             [name]: value
            }
            ))
    }
    console.log(meme)
    return(
        <div className="meme">
            <div className="form-meme" >
                <input 
                    type="text"
                    placeholder="Top Text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                type="text" 
                placeholder="Bottom Text"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
                />
                <button className="form-button" 
                    onClick={getMemeImage}
                > Get a new meme image  🖼</button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} className="meme-img" alt="img"/>
            <h2 className=" meme-text topText">{meme.topText}</h2>
            <h2 className="meme-text bottomText">{meme.bottomText}</h2>
            </div>
        </div>
    )
}