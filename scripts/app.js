import { renderDeck } from "./deck.js"

function getCardDeck(){
    const deck = renderDeck()
    // deck.forEach(el => document.body.append(el))
    document.querySelector('.dealer-cards').append(deck[51])
    document.querySelector('.dealer-cards').append(deck[50])
    document.querySelector('.dealer-score').innerText = +deck[51].children[0].dataset.value + +deck[50].children[0].dataset.value
    document.querySelector('.player-cards').append(deck[0])
    document.querySelector('.player-cards').append(deck[7])
    document.querySelector('.player-score').innerText = +deck[0].children[0].dataset.value + +deck[7].children[0].dataset.value
    return deck
}
getCardDeck()

// everything runs inside it
const main = () => {

}

main()


