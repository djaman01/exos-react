import { useEffect, useState } from "react"
import './martoCiso.css'

export default function MartoCiso() {

  const [computerChoice, setComputerChoice] = useState(null);

  const [playerChoice, setPlayerChoice] = useState(null);

  const [userName, setUserName] = useState('');

  const [clicked, setClicked] = useState(false);

  const [finalName, setFinalName] = useState(''); //Obligé pour que quand on reset la value à 0 après le save, le finalName restera rempli avec le userName entrée

  const [userScore, setUserScore] = useState(0);
  const [ComputerScore, setComputerScore] = useState(0);

  const [computerWin, setComputerWin] = useState(false);
  const [userWin, setUserWin] = useState(false);




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
          (playerTurn === "Pierre" && computerTurn === "Feuille") ? `You loose...` :
            (playerTurn === "Feuille" && computerTurn === "Ciseaux") ? `You loose...` :
              (playerTurn === "Ciseaux" && computerTurn === "Pierre") ? `You loose...` :
                `You Win !`
    )
  }
  const result = getResult(playerChoice, computerChoice); //On stocke le résultat dans une variable pour pouvoir l'utiliser facilement


  useEffect(() => {
    result === 'You Win !' ?
      setUserScore(prevScore => prevScore + 1) :
      result === 'You loose...' && setComputerScore(prevScore => prevScore + 1); //Quand on veut arréter le elseIf sans mettre de contre partie, on écrit &&
  }, [result, playerChoice, computerChoice]);

  useEffect(() => {
    (userScore === 3) ? setUserWin(true) :
      (ComputerScore === 3) && setComputerWin(true);
  }, [userScore, ComputerScore])


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
        <h1> Your Choice is : {playerChoice} </h1>
      }


      <h1>Result: {result}</h1>
      <h1>{finalName} Score: {userScore} </h1>
      <h1>Computer Score: {ComputerScore} </h1>

      {userWin === true ?
        <div>
          <h1>{finalName} Wins !</h1>
        </div> :
        computerWin === true &&
        <div>
        <h1>Computer Wins ...</h1>
      </div>
      }


      <div>


      </div>
    </div>
  )
}
