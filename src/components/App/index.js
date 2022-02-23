import {ReactComponent as Like} from './../../assets/icons/like.svg';
import React, { useState, useEffect } from 'react';
import './index.scss';
import FactsCards from '../FactsCards';

function App() {
  const [facts, setFacts] = useState([]);
  const [showFactsCount, setShowFactsCount] = useState(10);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState([])

  function getData () {
    fetch("https://catfact.ninja/facts")
      .then((res) => res.json())
      .then((json) => {
        if(json.data){
          setLikesCount(0)
          setDislikesCount(0)
          setLikes([])
          setDislikes([])
          setFacts(json.data.slice(0, showFactsCount))
        }
      })
  }

  function showNewFacts (e) {
    e.preventDefault() 
    getData()
  }

  useEffect(() => { getData() },[]);

  function onLikePress (factIndex) {
    let likesArr = likes
    if(!likesArr.includes(factIndex)){
      let dislikesValue = dislikesCount
      let dislikesArr = dislikes
      likesArr.push(factIndex)
      setLikesCount(likesArr.length)
      setLikes(likesArr)
      if (dislikesValue > 0) {
        console.log("bf",dislikesArr)
        dislikesArr = dislikesArr.filter(i => factIndex != i)
        console.log("af",dislikesArr)
        setDislikesCount(dislikesArr.length)
        setDislikes(dislikesArr)
      }
    }
  }

  function onDislikePress (factIndex) {
    let dislikesArr = dislikes
    if(!dislikesArr.includes(factIndex)){
      let likesValue = likesCount
      let likesArr = likes
      dislikesArr.push(factIndex)
      setDislikesCount(dislikesArr.length)
      setDislikes(dislikesArr)
      if (likesValue > 0) {
        console.log("bf",likesArr)
        likesArr = likesArr.filter(i => factIndex != i)
        console.log("af",likesArr)
        setLikesCount(likesArr.length)
        setLikes(likesArr)
      }
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="header-title">Facts about cats</h1>
        <div className="header-input">
          <input className="header-input__input" 
            type="number" 
            min="1" 
            max="10" 
            value={showFactsCount} 
            onChange={(event) => {
              setShowFactsCount(event.target.value)
            }}>
          </input>
          <button className="header-input__button" onClick={showNewFacts}>Show new facts</button>
        </div>
        <div className="app__counter">
          <div className="app__counter--likes">
            <span className="likes-counter likes-counter--likes">Likes: {likesCount}</span>
            <Like className="like-icon like-icon--like" stroke="brown"/>
          </div>
          <div className="app__counter--dislikes">
            <span className="likes-counter likes-counter--dislikes">Dislikes: {dislikesCount}</span>
            <Like className="like-icon like-icon--dislike" stroke="brown"/>
          </div>
        </div>
      </header>
      <main className="app__main">
        <FactsCards facts={facts} dislikes={dislikes} likes={likes} likeAction={onLikePress} dislikeAction={onDislikePress}/>
      </main>
    </div>
  );
}

export default App;
