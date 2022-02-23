//import like from './../../assets/icons/like.svg';
import {ReactComponent as Like} from './../../assets/icons/like.svg';
import './index.scss';

function FactsCards(props) {
  return (
	<div className="facts-cards">
    {props.facts.map((fact, index) => {
      return <div className="card" key={index}>
				<p className="card__text">{fact.fact}</p>
				<div className="card__buttons">
				  <Like className={`card-button card-button--like 
				  	${props.likes.includes(index) ? `card-button--active` : ``}`} 
			  		alt="like" 
			  		onClick={(e)=>{
					  	e.preventDefault() 
					  	props.likeAction(index) 
					  }}/>
			  	<Like className={`card-button card-button--dislike 
			  		${props.dislikes.includes(index) ? `card-button--active` : ``}`}  
			  		alt="dislike" 
		  			onClick={(e)=>{
				  		e.preventDefault() 
				  		props.dislikeAction(index) 
				  	}}/>
				</div>
			</div>
		})}

	</div>
  );
}

export default FactsCards;
