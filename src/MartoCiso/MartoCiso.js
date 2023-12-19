import { useEffect, useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


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

  // const choices = [
  //   {name: "Pierre", image:"/images/pierre-main.png"},
  //   {name:"Feuille", image:"/images/feuille-main.png"},
  //   {name:"Ciseaux", image:"images/ciseaux-main.png"}

  // ]

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

  //Pour mettre à jour les states variables qui store les scores et augmenter si victoire
  useEffect(() => {
    result === 'You Win !' ?
      setUserScore(prevScore => prevScore + 1) :
      result === 'You loose...' && setComputerScore(prevScore => prevScore + 1); //Quand on veut arréter le elseIf sans mettre de contre partie, on écrit &&
  }, [result, playerChoice, computerChoice]);

  //Pour mettre à jour les state variable qui store si vrai ou faux user ou computer a gagné
  useEffect(() => {
    (userScore === 3) ? setUserWin(true) :
      (ComputerScore === 3) && setComputerWin(true);
  }, [userScore, ComputerScore])

  const resetScore = () => {
    setUserScore(0);
    setComputerScore(0);
    //obligé de reset même les states userWin et ComputerWin pour que le popup réparaisse avec WIN si on atteint 3 points
    setUserWin(false);
    setComputerWin(false);

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

      <div className="marto-scores">
        <h1 style={{ marginRight: "10px" }}>{finalName}: <span className="styled-score">{userScore}</span> </h1>
        <img className="foudre-score" src="/images/foudre-jeu.png" alt="foudre" />
        <h1>Computer: <span className="styled-score">{ComputerScore} </span></h1>
      </div>


      <div className="players-choices">
        {clicked &&
          <h1> {playerChoice} </h1>
        }

        <img className="versus-eclair" src="/images/vs-eclair.png" alt="versus" />

        <h1> {computerChoice} </h1>
      </div>


      <h1>Choose a sign</h1>

      <button onClick={getPlayerChoice}>Pierre</button>
      <button onClick={getPlayerChoice}>Feuille</button>
      <button onClick={getPlayerChoice}>Ciseaux</button>





      {userWin === true ? (
        <Popup open className="popup-content" onClose={resetScore}>   {/* ClassName obligée, sinon ne reconnait pas le CSS (voir guide npm)*/}
          <h1>{finalName} WINS !!</h1>
        </Popup>
      ) :
        computerWin === true && (
          <Popup open className="popup-content" onClose={resetScore}>
            <div>
              <h1>Computer Wins ...</h1>
            </div>
          </Popup>
        )}




      <div>


      </div>
    </div>
  )
}
