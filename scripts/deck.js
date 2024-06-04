"use strict"

function createCard(sign, num, value){
    let arr = []
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('card__container')
    cardContainer.innerHTML = `
    <div class="card" data-sign=${sign} data-name="${num}" data-value="${value}">
        <div class="card-content">
            <div class="card-left-side">
                <span class="card-left-side-num">${num}</span>
                <span class="card-left-side-sign">${sign}</span>
            </div>
            <div class="card-middle">
                <div class="left-signs">
                </div>

                <div class="center-signs">
                </div>

                <div class="right-signs">
                </div>
            </div>
            <div class="card-right-side">
                <span class="card-right-side-num">${num}</span>
                <span class="card-right-side-sign">${sign}</span>
            </div>
        </div>
    </div>
    `
    arr.push(cardContainer)
    let math = Math.round(num / 2.5)
    for(let i = 0; i < math; i++){
        if(num === 2 || num === 3){
            continue
        }
        if(num === 6){
            math = Math.ceil(num / 2.5)
        }
        if(num > 6){
            math = Math.round(num / 2.5)
        }
        arr[arr.length-1].children[0].childNodes[1].children[1].children[0].innerHTML += `
        <span>${sign}</span>
        `
        arr[arr.length-1].children[0].childNodes[1].children[1].children[2].innerHTML += `
        <span>${sign}</span>
        `

    }
        switch (num) {
            case 2:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML += `
                <span>${sign}</span>
                <span>${sign}</span>
                `
                break;
            case 3:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML += `
                <span>${sign}</span>
                <span>${sign}</span>
                <span>${sign}</span>
                `
                break;
            case 5:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML += `
                <span>${sign}</span>
                `
                break;
            case 7:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML += `
                <span>${sign}</span>
                <span></span>
                `
                break;
            case 8:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML += `
                <span>${sign}</span>
                <span>${sign}</span>
                `
                break;
            case 9:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML += `
                <span>${sign}</span>
                <span></span>
                `
                break;
            case 10:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML += `
                <span>${sign}</span>
                <span>${sign}</span>
                `
                break;
            case 'J':
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML = `
                <span>${num}</span>
                `
                break
            case 'Q':
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML = `
                <span>${num}</span>
                `
                break
            case 'K':
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML = `
                <span>${num}</span>
                `
                break
            case 'A':
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML = `
                <span>${sign}</span>
                `
                break
            default:
                arr[arr.length-1].children[0].childNodes[1].children[1].children[1].innerHTML = `
                <span class="empty-card-space"></span>
                `
                break;
        }
        
        return arr
}


function cardSigns(){
    const cardMap = new Map()
    .set('signs', ['♠', '♣', '♥', '♦',])
    .set('nums', [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'])
    .set('values', [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11])
    return cardMap
}

export function renderDeck(){
    let arr = []
    const cardmap = cardSigns()
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < cardmap.get('nums').length; j++){
           arr.push(createCard(cardmap.get('signs')[i], cardmap.get('nums')[j], cardmap.get('values')[j]))
        }
    }
    for(let i = 0; i < arr.length; i++){
        if(arr[i][0].children[0].dataset.sign === '♥'
         || arr[i][0].children[0].dataset.sign === '♦'){
            arr[i][0].children[0].style.color = 'red'
        }
    }
    return arr.flat()
}