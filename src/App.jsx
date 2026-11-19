import { useMemo, useState } from 'react';
import { decks, deckInfo } from './data/cards';
import DeckSelector from './components/DeckSelector';
import SpreadSelector, { spreads } from './components/SpreadSelector';
import DrawModeSelector from './components/DrawModeSelector';
import CardTable from './components/CardTable';
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=crypto.getRandomValues(new Uint32Array(1))[0]%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export default function App(){
 const [deck,setDeck]=useState('tarot'),[spread,setSpread]=useState('three'),[mode,setMode]=useState('random'),[customCount,setCustomCount]=useState(4),[cards,setCards]=useState([]),[pool,setPool]=useState([]),[hasDrawn,setHasDrawn]=useState(false),[readingId,setReadingId]=useState(0);
 const needed=spread==='custom'?customCount:spreads.find(s=>s.id===spread)?.count||1;
 const currentDeck=useMemo(()=>decks[deck],[deck]);
 function reset(next){setDeck(next);setCards([]);setPool([]);setHasDrawn(false);}
 function draw(){setCards([]);setReadingId(n=>n+1);setHasDrawn(true);if(mode==='manual'){setPool(shuffle(currentDeck));return;}setCards(shuffle(currentDeck).slice(0,needed).map(c=>({...c,reversedDraw:deck!=='oracle'&&Math.random()<.28})));}
 function choose(card){setCards(old=>{const next=[...old,{...card,reversedDraw:deck!=='oracle'&&Math.random()<.28}];if(next.length>=needed)setPool([]);return next;});setPool(old=>old.filter(c=>c.id!==card.id));}
 function resetReading(){setCards([]);setPool([]);setHasDrawn(false);}
 return <main className="app-shell"><div className="ambient ambient-one"/><div className="ambient ambient-two"/><header className="topbar"><a className="brand" href="#top" aria-label="Stillwell home"><span className="brand-mark">✳</span> STILLWELL</a><span className="top-note">A QUIET SPACE TO LISTEN</span><button className="about-link" onClick={()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>About</button></header><div className="content" id="top"><section className="hero"><span className="eyebrow"><span className="eyebrow-dot"/> A MOMENT FOR YOURSELF</span><h1>Find a little <em>stillness.</em></h1><p>Choose a deck, settle into a question, and see what the cards invite you to notice.</p></section>
 <section className="setup-section"><div className="section-heading"><span className="step-number">01</span><div><h2>Choose your deck</h2><p>Every deck offers a different way in.</p></div></div><DeckSelector value={deck} onChange={reset}/></section>
 <section className="setup-section"><div className="section-heading"><span className="step-number">02</span><div><h2>Choose a spread</h2><p>Follow a familiar layout or keep it open.</p></div></div><SpreadSelector value={spread} onChange={s=>{setSpread(s);resetReading();}} customCount={customCount} onCustomCount={n=>{setCustomCount(n);resetReading();}}/></section>
 <section className="setup-section mode-section"><div className="section-heading"><span className="step-number">03</span><div><h2>Choose your approach</h2><p>Trust chance or follow your own curiosity.</p></div></div><DrawModeSelector value={mode} onChange={m=>{setMode(m);resetReading();}}/></section>
 <div className="action-row"><button className="button button-primary" onClick={draw}><span>✧</span>{hasDrawn?'Draw again':'Begin your reading'}<span className="button-arrow">↗</span></button>{hasDrawn&&<button className="button button-quiet" onClick={resetReading}>Clear reading</button>}<span className="deck-caption">{deckInfo[deck].count} cards · {deckInfo[deck].label}</span></div>
 <div className="table-wrap" key={`${readingId}-${spread}-${deck}`}><div className="table-topline"><span>YOUR READING</span>{hasDrawn&&cards.length>0&&<span>{cards.length} CARD{cards.length===1?'':'S'} DRAWN</span>}</div><CardTable cards={cards} spread={spread} manual={mode==='manual'} pool={pool} onPick={choose} needed={needed} hasDrawn={hasDrawn}/></div>
 <section className="closing-note" id="about"><span className="closing-star">✳</span><div><span className="eyebrow">A GENTLE REMINDER</span><p>There are no wrong ways to meet a card. Let this be a starting point for reflection—your own wisdom remains the most important part of the reading.</p></div></section><footer><span>STILLWELL</span><span>Made for moments of reflection</span><span>© {new Date().getFullYear()}</span></footer></div></main>;
}
