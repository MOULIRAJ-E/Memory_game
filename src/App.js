import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages= [
  {"src":"/img/helmet-1.png", matched:false},
  {"src":"/img/potion-1.png", matched:false },
  {"src":"/img/ring-1.png"  , matched:false },
  {"src":"/img/scroll-1.png", matched:false },
  {"src":"/img/shield-1.png", matched:false },
  {"src":"/img/sword-1.png" , matched:false },

]
function App() {
  const[cards,setcards]=useState([])
  const [turns,setturns]=useState(0)
  const [choiceone , setchoiceone]=useState(null)
  const [choicetwo , setchoicetwo]=useState(null)
  const [disabled,setdisabled]=useState(false)
  const shufflecards=() =>{
    const shuffledcards=[...cardImages,...cardImages]
      .sort(() => Math.random()-0.5)
      .map((c) =>({...c,id: Math.random()}))
      setchoiceone(null)
      setchoicetwo(null)
      setcards(shuffledcards)
      setturns(0)
  }
  const handlechoice =(card) =>{
    choiceone ? setchoicetwo(card): setchoiceone(card)

  }
  useEffect(() =>{
   
    if(choiceone && choicetwo){
      setdisabled(true)

      if(choiceone.src === choicetwo.src){
        setcards(prevcards =>{
          return prevcards.map(card =>{
            if(card.src===choiceone.src){
              return{...card,matched: true}
            }else{
              return card
            }
          })
        })
        reset()
      }else{
        setTimeout(() => reset(),1000)
      }
    }
  },[choiceone,choicetwo])
  // console.log(cards)

  const reset =() =>{
    setchoiceone(null)
    setchoicetwo(null)
    setturns(prevturns => prevturns + 1)
    setdisabled(false)
  }

  useEffect( () =>{
    shufflecards()
  }, [])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shufflecards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard  
          key={card.id} 
          card={card}
          handlechoice={handlechoice}
          flipped={card === choiceone || card === choicetwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}
export default App