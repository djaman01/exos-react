import { useState } from "react"

export default function MartoCiso() {

  const [computerChoice, setComputerChoice] = useState(null);

  const [playerChoice, setPlayerChoice] = useState(null);


  const choices = ['Pierre', 'Feuille', 'Ciseaux']


  const getPlayerChoice = (e) => {
    setPlayerChoice(e.target.innerText)
    setComputerChoice(choices[Math.floor(Math.random() * choices.length)])
  }

  //explication de getRandomChoice:
  //Math.random(): Generates a random floating-point number between 0 (inclusive) and 1 (exclusive) 
  // +
  //Math.floor(...): Rounds down the result to the nearest integer (pour avoir un résultat ente 0 et 3)
  //Résulat:
  //En appelant la function, on aura aléatoirement: choices[0], choices[1], choices[2] ou choices[3]

  //Pour décider du résultat:

  const getResult = (playerTurn, computerTurn) => { //Obligé" d'écrire return car + de 1 block code
    return (
      (playerTurn === null && computerTurn === null) ? '' : //Pour que rien n'appraisse dans le résultat quand on load la page
        (playerTurn === computerTurn) ? 'Égalité' :
          (playerTurn === "Pierre" && computerTurn === "Feuille") ? "You lose" :
            (playerTurn === "Feuille" && computerTurn === "Ciseaux") ? "You lose" :
              (playerTurn === "Ciseaux" && computerTurn === "Pierre") ? "You lose" :
                "You win !"
    )
  }




  return (
    <>

    <h1 className="title-shifumi">Pierre- Feuille- Ciseaux: Le jeu !</h1>

      <h1> Computer Choice : {computerChoice} </h1>

      <h1>Choose a sign</h1>

      <button onClick={getPlayerChoice}>Pierre</button>
      <button onClick={getPlayerChoice}>Feuille</button>
      <button onClick={getPlayerChoice}>Ciseaux</button>

      <h1> Player Choice : {playerChoice} </h1>

      <h1>Result: {getResult(playerChoice, computerChoice)}</h1>

    </>
  )
}
