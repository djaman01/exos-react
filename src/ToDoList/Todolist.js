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
    setClicked(true);
    setTasks([...tasks, value]);
    setValue("");
  }


  return (
    <>
      <h1>My To do List</h1>

      {clicked && tasks.map(e =>
        <div className="my-task">
          <span>{e}</span>
          <div className="pen-trash">
            <FaRegTrashAlt />
            <FaRegPenToSquare />
          </div>
        </div>
      )}

      <p>Tasks: </p>
      <input type="text" value={value} onChange={handleValue} />
      <button className="btn-task" onClick={handleClicked}>Save Task</button>

    </>
  )
}
