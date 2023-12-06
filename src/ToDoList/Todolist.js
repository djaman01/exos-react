import "./todolist.css"
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function Todolist() {

  //Pour stocker la valeur de l'input
  const [value, setValue] = useState("");

  //Pour déclencher le stockage de la value de l'input en onChange
  const handleValue = (e) => {
    setValue(e.target.value)
  }

  //Pour pouvoir créer une condition que si c'est true, la task apparait
  const [clicked, setClicked] = useState(false);
  //Pour stock une array de toutes les tasks ajoutés et mapper sur elle grpace à JSX dans return
  const [tasks, setTasks] = useState([]);

  //Quand on click qur le bouton save task
  const handleClicked = () => {
    setClicked(true); //quand c'est true le task apparait
    setTasks([...tasks, value]); //ajout de la tache dans l'array sur laquelle on va mapper
    setValue(""); //value de l'input est vdie pour ne pas affecter la tache ajoutée

  }

  const eraseTask = (index) => {
    const deleteTask = tasks.filter((_, i) => i !== index) // _ =pour pouvoir utiliser le 2ème paramètre de filter qui représente l'index de l'élement, car on n'utilise pas le 1er paramètre
    setTasks(deleteTask);
  }

  //Pour modifier le task dans un input au même endroit

  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <>
      <h1>My To do List</h1>

      {clicked && tasks.map((element, index) =>
        <div className="my-task">
          <span className="the-task">{element}</span>
          <div className="pen-trash">
            <FaRegPenToSquare />
            <FaRegTrashAlt onClick={() => eraseTask(index)}  />
            {/* !!! index=index element dans map // Quand on ajoute un argument pour donner une valeur au parametre de eraseTask, on est obligé d'écrire la function comme ça, sinon elle serait appelé directement quand ça va render et non quand on va click */}
          </div>
        </div>
      )}

      <p>Tasks: </p>
      <input type="text" value={value} onChange={handleValue} />
      <button className="btn-task" onClick={handleClicked}>Save Task</button>
      {/* onClick={handleClicked} appelle la function quand on click, car on n'ajoute pas de paramètre */}

    </>
  )
}
