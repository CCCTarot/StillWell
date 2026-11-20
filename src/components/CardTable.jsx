import { useState } from 'react';
import CardModal from './CardModal';

const positions={
  one:['The message'],
  three:['What’s behind you','Where you are','What’s unfolding'],
  five:['The heart of it','What supports you','What challenges you','A new perspective','A helpful next step'],
  celtic:['The present','The crossing','The foundation','The recent past','The possibility','The near future','Your approach','The surrounding energy','Hopes & concerns','The way forward']
};

export default function CardTable({cards=[],spread='one',deck='tarot',manual=false,pool=[],onPick,needed=1,hasDrawn=false}) {
  const [active,setActive]=useState(null);
  const isLenormand=deck==='lenormand';
  const labels=isLenormand
    ? cards.map((_,i)=>`Card ${i+1}`)
    : spread==='custom'
      ? Array.from({length:needed},(_,i)=>`Card ${i+1}`)
      : (positions[spread]||positions.one);

  if(!hasDrawn) return <section className="table-empty"><div className="table-sigil">✧</div><p>Your reading will appear here</p><span>Take a breath, set an intention, and begin when you’re ready.</span></section>;

  if(manual&&cards.length<needed) return <section className="pick-area"><div className="pick-heading"><div><span className="eyebrow">YOUR INTUITION, YOUR CHOICE</span><h2>Choose {needed-cards.length} {needed-cards.length===1?'card':'cards'}</h2></div><span className="pick-counter">{cards.length} <i>/</i> {needed}</span></div><div className="pick-grid">{pool.map((card,i)=><button className="pick-card" key={card.id} onClick={()=>onPick(card)} aria-label={`Choose a card, position ${i+1}`}><div className="card-back"><span>✧</span></div></button>)}</div><p className="pick-hint">Choose the cards that draw your attention. Each card can only be chosen once.</p></section>;

  return <section className={`table-board ${cards.length>5?'wide':''} ${isLenormand?'lenormand-board':''}`} aria-label={isLenormand?'Your Lenormand card line':'Your card spread'}>
    {cards.map((card,i)=><button key={`${card.id}-${i}`} className={`drawn-card deal-in ${card.reversedDraw?'reversed':''}`} style={{'--delay':`${i*90}ms`}} onClick={()=>setActive({card,position:labels[i]||`Card ${i+1}`})} aria-label={`View ${card.title}, ${labels[i]||`card ${i+1}`}`}><div className="card-face"><span className="card-category">{card.category}</span><span className="card-glyph">{card.glyph}</span><span className="card-title">{card.title}</span><span className="card-position">{isLenormand?`#${card.number} · ${labels[i]}`:labels[i]||`Card ${i+1}`}</span></div></button>)}
    {isLenormand&&cards.length>1&&<section className="lenormand-pairs" aria-labelledby="lenormand-pairs-title"><div className="pairs-heading"><span className="eyebrow">READ THE LINE TOGETHER</span><h3 id="lenormand-pairs-title">Card combinations</h3><p>Each card on the left modifies the card that follows.</p></div><div className="pairs-list">{cards.slice(0,-1).map((left,i)=>{const right=cards[i+1];return <article className="pair-row" key={`${left.id}-${right.id}`}><div className="pair-label"><span>#{left.number} {left.title}</span><span className="pair-arrow" aria-label="modifies">→</span><span>#{right.number} {right.title}</span></div><p><strong>{left.title} modifies {right.title}.</strong> {left.meaning} Read this in relation to {right.title.toLowerCase()}: {right.meaning}</p></article>;})}</div></section>}
    <CardModal card={active?.card} position={active?.position} onClose={()=>setActive(null)}/>
  </section>;
}
