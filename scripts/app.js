import { renderDeck } from "./deck.js"

function getCardDeck(){
    const deck = renderDeck()
    // deck.forEach(el => document.body.append(el))
    return deck
}

getCardDeck()