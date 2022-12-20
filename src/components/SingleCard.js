import './SingleCard.css'
export default function SingleCard({card,handlechoice,flipped,disabled}) {
    const handleclick =() =>{
        if(!disabled)
        {
         handlechoice(card)
        }
    }
  return (
    <div className="card">
        <div className={flipped ? "flipped" :" "} >
            <img className="front" src={card.src} alt="card front" />
            <img className="back" 
            src="/img/cover.png" 
            onClick={handleclick}
            alt="cover" 
            />
        </div>
    </div>
  )
}
