import { renderDeck } from "./deck.js"
const nextRoundBtn = document.getElementById('next-round-btn')
const overlay = document.querySelector('.overlay')
const overlayMsg = document.querySelector('.overlay-message')
const restartGame = document.getElementById('restart-btn')
const dealerScore = document.querySelector('.dealer-score')
const dealerCards = document.querySelector('.dealer-cards')
const playerSideWrapper = document.querySelector('.player-side-wrapper')
const playerSide = document.querySelector('.player-side')
const playerScore = document.querySelector('.player-score')
const playerCards = document.querySelector('.player-cards')
const betButtons = document.querySelectorAll('.chip')
const currentBet = document.querySelector('.current-bet')
const playerBalance = document.querySelector('.player-balance')
const startRound = document.getElementById('start-round-btn')
const optionButtons = document.querySelectorAll('.right-side-btn-style')
const navWrapper = document.querySelector('.nav-panel')
const tableWrapper = document.querySelector('.table')
const playerPanelWrapper = document.querySelector('.player-panel')
const resetBetBtn = document.getElementById('reset-btn')

const passBtn = document.getElementById('pass-btn')
const hitBtn = document.getElementById('hit-btn')
const doubleBtn = document.getElementById('double-btn')
const splitBtn = document.getElementById('split-btn')

function getCardDeck(){
    const deck = renderDeck()
    return deck
}

function shuffleDeck(arr){
     // Swap elements in Array v2
     for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    
        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
}


// everything runs inside it
const main = () => {
    addBetValuesToCurrentBet()
    newRound()
}

main()

function giveStartCardsForPlayer(player, score, arr, numOfIterations){
    let num = +score.dataset.scoreValue || 0
    for(let i = 0; i < numOfIterations; i++){
        arr.pop()
        player.append(arr[arr.length-1])
        num += +arr[arr.length-1].children[0].dataset.value
        arr[arr.length-1].children[0].classList.add('animateCard')
    }
    score.classList.add('animateScore')
    score.dataset.scoreValue = +num
    score.innerText = score.dataset.scoreValue
}


function clearTable(player, score){
    player.innerHTML = ''
    score.dataset.scoreValue = ''
    score.innerHTML = ''
}

// events
restartGame.addEventListener('click', () => {
    if(restartGame.ariaDisabled === 'true'){
        console.log('restart disabled!')
        return
    }
    window.location.reload()
})

function addBetValuesToCurrentBet(){
    let sum = 0

    betButtons.forEach(el => {
        el.addEventListener('click', (e) => {
            if(el.ariaDisabled === 'true'){
                console.log('disabled')
                return
            }
            if(currentBet.dataset.curBetValue === ''){
                sum = 0
                console.log(`value: ${sum} ${+currentBet.dataset.curBetValue}`)
            }

            if(+currentBet.dataset.curBetValue >= +playerBalance.dataset.balanceValue){
                return
            }
            // parent & child click event conflict
            if(!e.target.dataset.value){
                if(+currentBet.dataset.curBetValue + +e.target.parentElement.dataset.value > +playerBalance.dataset.balanceValue){
                    return
                }
                if(e.target.parentElement.dataset.value === 'all-in'){
                    currentBet.dataset.curBetValue = playerBalance.dataset.balanceValue
                    currentBet.innerText = currentBet.dataset.curBetValue
                    return
                }
                sum += +e.target.parentElement.dataset.value
                currentBet.dataset.curBetValue = sum
                currentBet.innerText = sum
                return
            }
            
            if(+currentBet.dataset.curBetValue + +e.target.dataset.value > +playerBalance.dataset.balanceValue){
                return
            }
            if(e.target.dataset.value === 'all-in'){
                currentBet.dataset.curBetValue = playerBalance.dataset.balanceValue
                currentBet.innerText = currentBet.dataset.curBetValue
                return
            }
            sum += +e.target.dataset.value
            currentBet.dataset.curBetValue = sum
            currentBet.innerText = sum
        })

        })
}



function disableBetButtons(){
    betButtons.forEach(el => {
        el.ariaDisabled = 'true'
    })
}

function enableBetButtons(){
    betButtons.forEach(el => {
        el.ariaDisabled = 'false'
    })
}


function plusBalance(score){
    playerBalance.dataset.balanceValue = +playerBalance.dataset.balanceValue + +score.dataset.curBetValue;
    playerBalance.innerText = `${playerBalance.dataset.balanceValue}$`
     return
}

function minusBalance(score){
    playerBalance.dataset.balanceValue = playerBalance.dataset.balanceValue - score.dataset.curBetValue;
    playerBalance.innerText = `${playerBalance.dataset.balanceValue}$`
    return
}

function newRound(){
    let cards = getCardDeck()
    let isWon = false
    startRound.addEventListener('click', () => {
        if(startRound.ariaDisabled === 'true'){
            console.log('aria-disabled-true')
            return
        }
        enableBetButtons()
        if(currentBet.dataset.curBetValue === ''){
            console.log('empty bet')
            return
        }
        let i = 2;
        clearTable(dealerCards, dealerScore)
        clearTable(playerCards, playerScore)
        shuffleDeck(cards)
        giveStartCardsForPlayer(dealerCards, dealerScore, cards, 1)
        giveStartCardsForPlayer(playerCards, playerScore, cards, i)
        console.log('start round')
        disableBetButtons()
        startRound.ariaDisabled = 'true'
        optionButtons.forEach(el => el.ariaDisabled = 'false')
        if(+playerScore.dataset.scoreValue === 21){
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        }
        if(+playerScore.dataset.scoreValue > 21){
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        }
        console.log(cards.length)
    })

    // Hit
    hitBtn.addEventListener('click', () => {
        if(optionButtons[1].ariaDisabled === 'true'){
            console.log('hit disabled!')
            return
        }
        optionButtons[1].ariaDisabled = 'true'

        if(startRound.ariaDisabled === 'false'){
            console.log('aria-disabled-true')
            return
        }
        if(+playerScore.dataset.scoreValue === 21){
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        }
        if(+playerScore.dataset.scoreValue > 21){
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            // dealer gameplay if hit btn is pressed && playerscore > 21
        for(let i = 0; i < 7; i++){
            if(+dealerScore.dataset.scoreValue > 21){
                console.log('Dealer Lost! You win!')
                break
            }
            if(+dealerScore.dataset.scoreValue <= 16 ){
                giveStartCardsForPlayer(dealerCards, dealerScore, cards, 1)
                console.log('dealer hit!')
                continue
            }
            if(+dealerScore.dataset.scoreValue >= 17 && +dealerScore.dataset.scoreValue <= 20){
                console.log('dealer stand')
                break
            }
            if(+dealerScore.dataset.scoreValue === 21){
                console.log('dealer win!')
                break
            }
        }
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        }
        giveStartCardsForPlayer(playerCards, playerScore, cards, 1)
        if(+playerScore.dataset.scoreValue === 21){
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        }
        if(+playerScore.dataset.scoreValue > 21){
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        }
        optionButtons.forEach(el => el.ariaDisabled = 'false')
    })

    // Pass
    passBtn.addEventListener('click', () => {
        if(startRound.ariaDisabled === 'false'){
            console.log('aria-disabled-true')
            return
        }
        optionButtons.forEach(el => el.ariaDisabled = 'true')
        // dealer gameplay if pass btn is pressed
        for(let i = 0; i < 7; i++){
            if(+dealerScore.dataset.scoreValue > 21){
                console.log('Dealer Lost! You win!')
                break
            }
            if(+dealerScore.dataset.scoreValue <= 16 ){
                giveStartCardsForPlayer(dealerCards, dealerScore, cards, 1)
                console.log('dealer hit!')
                continue
            }
            if(+dealerScore.dataset.scoreValue >= 17 && +dealerScore.dataset.scoreValue <= 20){
                console.log('dealer stand')
                break
            }
            if(+dealerScore.dataset.scoreValue === 21){
                console.log('dealer win!')
                break
            }
        }
        getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)

    })

    // doubleBtn

    doubleBtn.addEventListener('click', () => {
        if(doubleBtn.ariaDisabled === 'true'){
            console.log('disabled btn')
            return
        }
        if(currentBet.dataset.curBetValue === ''){
            console.log('empty cur bet')
            return
        }
        if(+currentBet.dataset.curBetValue * 2 > +playerBalance.dataset.balanceValue){
            console.log('no money for x2 bet')
            return
        }
        currentBet.dataset.curBetValue = +currentBet.dataset.curBetValue * 2
        currentBet.innerText = currentBet.dataset.curBetValue
        doubleBtn.ariaDisabled = 'true'
        giveStartCardsForPlayer(playerCards, playerScore, cards, 1)
        
        if(+playerScore.dataset.scoreValue === 21){
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        }
        
            optionButtons.forEach(el => el.ariaDisabled = 'true')
            // dealer gameplay if hit btn is pressed && playerscore > 21
        for(let i = 0; i < 7; i++){
            if(+dealerScore.dataset.scoreValue > 21){
                console.log('Dealer Lost! You win!')
                break
            }
            if(+dealerScore.dataset.scoreValue <= 16 ){
                giveStartCardsForPlayer(dealerCards, dealerScore, cards, 1)
                console.log('dealer hit!')
                continue
            }
            if(+dealerScore.dataset.scoreValue >= 17 && +dealerScore.dataset.scoreValue <= 20){
                console.log('dealer stand')
                break
            }
            if(+dealerScore.dataset.scoreValue === 21){
                console.log('dealer win!')
                break
            }
        }
            getResult(playerScore.dataset.scoreValue, dealerScore.dataset.scoreValue, currentBet)
            return
        
    })

    // Split logic
    splitBtn.addEventListener('click', () => {
        if(splitBtn.ariaDisabled === 'true'){
            console.log('Split disabled!')
            return
        }

        if(playerCards.childElementCount === 2){
            if(+playerCards.children[0].children[0].dataset.value === +playerCards.children[1].children[0].dataset.value){
                const playerClone = playerSide.cloneNode(true)
                playerSideWrapper.append(playerClone)
                const splitPlayerCards = document.querySelectorAll('.player-cards')
                const splitPlayerScore = document.querySelectorAll('.player-score')
                splitPlayerCards[0].children[1].remove()
                splitPlayerScore[0].dataset.scoreValue = splitPlayerCards[0].children[0].children[0].dataset.value
                splitPlayerScore[0].innerText = splitPlayerScore[0].dataset.scoreValue
                splitPlayerCards[1].children[0].remove()
                splitPlayerScore[1].dataset.scoreValue = splitPlayerCards[1].children[0].children[0].dataset.value
                splitPlayerScore[1].innerText = splitPlayerScore[1].dataset.scoreValue
            }
        }
    })
}


resetBetBtn.addEventListener('click', resetCurrentBet)


function resetCurrentBet(){
    currentBet.dataset.curBetValue = ''
    currentBet.innerText = ''
}

nextRoundBtn.addEventListener('click', () => {
    overlay.classList.toggle('animateScore')
    navWrapper.classList.toggle('isBlured')
    tableWrapper.classList.toggle('isBlured')
    playerPanelWrapper.classList.toggle('isBlured')
    clearTable(dealerCards, dealerScore)
    clearTable(playerCards, playerScore)
    resetCurrentBet()
    enableBetButtons()
    startRound.ariaDisabled = 'false'
})



function getResult(pScore, dScore, bet){
    let timer = 2000;
    setTimeout(() => {
        let resText = isWinner(pScore, dScore, bet)
        overlay.classList.add('animateScore')
        overlayMsg.innerText = resText
        navWrapper.classList.add('isBlured')
        tableWrapper.classList.add('isBlured')
        playerPanelWrapper.classList.add('isBlured')
    }, timer);
}


function isWinner(pScore, dScore, bet){
    if(+pScore === +dScore){
        console.log('Draw!')
        return "Draw"
    }
    if(+pScore > +dScore && +pScore < 22){
        console.log('You win!', pScore)
        plusBalance(bet)
        return `You win ${bet.dataset.curBetValue}$`
    }
    if(+pScore > +dScore && +pScore > 21){
        console.log('You Lose!', dScore)
        minusBalance(bet)
        return `You Lose ${bet.dataset.curBetValue}$`
    }
    if(+pScore < +dScore && +dScore < 22){
        console.log('You Lose!', dScore)
        minusBalance(bet)
        return `You Lose! ${bet.dataset.curBetValue}$`
    }
    if(+pScore < +dScore && +dScore > 21){
        console.log('You Win', pScore)
        plusBalance(bet)
        return `You Win! ${bet.dataset.curBetValue}$`
    }
}

