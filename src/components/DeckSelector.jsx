import { deckInfo } from '../data/cards';
export default function DeckSelector({ value, onChange }) {
  return <div className="deck-grid" role="radiogroup" aria-label="Choose a deck">{Object.entries(deckInfo).map(([id,deck])=><button key={id} className={`deck-choice ${value===id?'selected':''}`} role="radio" aria-checked={value===id} onClick={()=>onChange(id)}><span className="deck-orbit">{id==='tarot'?'✦':id==='oracle'?'☾':'⌘'}</span><span className="deck-name">{deck.label}</span><span className="deck-sub">{deck.sub}</span><span className="deck-count">{deck.count} cards</span></button>)}</div>;
}
