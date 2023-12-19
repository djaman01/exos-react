import { useEffect, useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


import './martoCiso.css'

export default function MartoCiso() {

  const [computerChoice, setComputerChoice] = useState({ name: null, image: null });
  const [playerChoice, setPlayerChoice] = useState({ name: null, image: null });


  const [userName, setUserName] = useState('');

  const [clicked, setClicked] = useState(false); //Pour save le username

  const [finalName, setFinalName] = useState(''); //Obligé pour que quand on reset la value à 0 après le save, le finalName restera rempli avec le userName entrée

  const [userScore, setUserScore] = useState(0);
  const [ComputerScore, setComputerScore] = useState(0);

  const [computerWin, setComputerWin] = useState(false);
  const [userWin, setUserWin] = useState(false);


  const choices = [
    { name: "Pierre", image: "/images/pierre-main.png" },
    { name: "Feuille", image: "/images/feuille-main.png" },
    { name: "Ciseaux", image: "images/ciseaux-main.png" }
  ]

  const getUserName = (e) => {
    setUserName(e.target.value);
  }

  //Pour afficher le userName:
  const isClicked = () => {
    setClicked(true);
    setFinalName(userName);
    setUserName('');
  }

  const getPlayerChoice = (e) => {
    const selectedChoice = choices.find(choice => choice.name === e.target.innerText);
    setPlayerChoice(selectedChoice); //on a selectionné l'objet qui correspond au choix de l'utilisateur (avec son name et son image)
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
        (playerTurn.name === computerTurn.name) ? 'Égalité' :
          (playerTurn.name === "Pierre" && computerTurn.name === "Feuille") ? `You loose...` :
            (playerTurn.name === "Feuille" && computerTurn.name === "Ciseaux") ? `You loose...` :
              (playerTurn.name === "Ciseaux" && computerTurn.name === "Pierre") ? `You loose...` :
                `You Win !`
    )
  }
  const result = getResult(playerChoice, computerChoice); //On stocke le résultat dans une variable et on lui donne une valeur en argument

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

      <p className="title-shifumi">Pierre- Feuille- Ciseaux: Le jeu !</p>

      <h2>Type your Username:</h2>

      <input
        className="input-user-marto"
        value={userName}
        onChange={getUserName}
      />
      <button className="marto-start" onClick={isClicked}>Start Game</button>

      <div className="marto-scores">
        <h2 style={{ marginRight: "10px" }}>{finalName}: <span className="styled-score">{userScore}</span> </h2>
        <img className="foudre-score" src="/images/foudre-jeu.png" alt="foudre" />
        <h2>Computer: <span className="styled-score">{ComputerScore} </span></h2>
      </div>


      <div className="players-choices">
        {
          <img className="image-player" src={playerChoice.image} alt={playerChoice.name} />
        }

        <img className="versus-eclair" src="/images/vs-eclair.png" alt="versus" />

        <img className="image-computer" src={computerChoice.image} alt={computerChoice.name} />
      </div>


      <h1>Choose a sign</h1>

      <button className="custom-btn btn-3" onClick={getPlayerChoice}><span>Pierre</span></button>
      <button className="custom-btn btn-3" onClick={getPlayerChoice}><span>Feuille</span></button>
      <button className="custom-btn btn-3" onClick={getPlayerChoice}><span>Ciseaux</span></button>





      {userWin === true ? (
        <Popup open className="popup-content" onClose={resetScore}>   {/* className obligée, sinon ne reconnait pas le CSS (voir guide npm)*/}
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
