let deckId = "";

fetch("http://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector("button").addEventListener("click", getCard);

function getCard() {
  const url = `http://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    document.querySelector('#player1').src = data.cards[0].image
    document.querySelector('#player2').src = data.cards[1].image
    let playerOneVal = convertToNum(data.cards[0].value)
    let playerTwoVal = convertToNum(data.cards[1].value)

    if(playerOneVal > playerTwoVal){
      document.querySelector('#result').innerText = 'Player 1 wins!!!'
    }else if(playerOneVal < playerTwoVal){
      document.querySelector('#result').innerText = 'Player 2 wins!!!'
    }else{
      document.querySelector('#result').innerText = 'This is WAR!!!'
    }

    if(data.remaining === 0){
      document.querySelector('#result').innerText = 'No more cards. Reshuffle!!!'
    }
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}



document.querySelector(".btn").addEventListener("click", shuffle);

function shuffle(){
  const url = `http://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    document.querySelector('#result').innerText = 'Deck has been reshuffled. Deal Cards!!!'
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
}


