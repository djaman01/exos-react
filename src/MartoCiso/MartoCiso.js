import { useState } from "react"
import './martoCiso.css'

export default function MartoCiso() {

  const [computerChoice, setComputerChoice] = useState(null);

  const [playerChoice, setPlayerChoice] = useState(null);

  const [userName, setUserName] = useState('');

  const [clicked, setClicked] = useState(false);

  const [finalName, setFinalName] = useState(''); //Obligé pour que quand on reset la value à 0 après le save, le finalName restera rempli avec le userName entrée

  const [score, setScore] = useState(0);


  const choices = ['Pierre', 'Feuille', 'Ciseaux']

  const getUserName = (e) => {
    setUserName(e.target.value);
  }

  const isClicked = () => {
    setClicked(true);
    setFinalName(userName);
    setUserName('');
  }

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
          (playerTurn === "Pierre" && computerTurn === "Feuille") ? `${finalName} loose...`:
            (playerTurn === "Feuille" && computerTurn === "Ciseaux") ? `${finalName} loose...`:
              (playerTurn === "Ciseaux" && computerTurn === "Pierre") ? `${finalName} loose...` :
                `${finalName} Win !`
    )
  }

  const getScore = (result, score) => {
    return (
      (result === `${finalName} Win !` ? setScore(score+=1) : null )
    )
  }




  return (
    <div className="marto-page">

      <h1 className="title-shifumi">Pierre- Feuille- Ciseaux: Le jeu !</h1>

      <h2>Type your Username:</h2>
      <input
        value={userName}
        onChange={getUserName}
      />
      <button onClick={isClicked}>Save</button>



      <h1> Computer Choice : {computerChoice} </h1>

      <h1>Choose a sign</h1>

      <button onClick={getPlayerChoice}>Pierre</button>
      <button onClick={getPlayerChoice}>Feuille</button>
      <button onClick={getPlayerChoice}>Ciseaux</button>

      {clicked &&
      <h1> {finalName} Choice is : {playerChoice} </h1>
      }


      <h1>Result: {getResult(playerChoice, computerChoice)}</h1>

      <div>


      </div>
    </div>
  )
}
