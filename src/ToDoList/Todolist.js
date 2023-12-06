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
  const [editedTask, setEditedTask] = useState("");

  const handleCancel = () => {
    setEditingIndex(null)
  }

  const updatedTasks = [...tasks];

  const handleUpdate = (index) => {
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null); //Pour revenir au stylo et poubelle quand on clique sur update
    setEditedTask(""); //Pour que quand on va encore update, ça revient pas à la valeur d'avant
  };

  return (
    <div className="all-todo-list">
      <h1>My To do List</h1>
{/* Début map sur array stored dans task */}
      {clicked && tasks.map((element, index) =>
        <div className="my-task">
          {editingIndex == index ?
            <input
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              placeholder={element}
            />
            :
            <span className="the-task">{element}</span>
          }
          <div className="pen-trash">
            {editingIndex == index ?
              <div>
                <button onClick={() => handleUpdate(index)}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
              :
              <div>
                <FaRegPenToSquare onClick={() => setEditingIndex(index)} />
                <FaRegTrashAlt onClick={() => eraseTask(index)} />
              </div>
            }
          </div>
        </div>
      )}
      {/* Fin map dans array stored dans tasl */}

      <p>Tasks: </p>
      <input type="text" value={value} onChange={handleValue} />
      <button className="btn-task" onClick={handleClicked}>Save Task</button>
      {/* onClick={handleClicked} appelle la function quand on click, car on n'ajoute pas de paramètre */}

    </div>
  )
}
