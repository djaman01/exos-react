import "./todolist.css"
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function Todolist() {

  const [value, setValue] = useState(""); //Pour stocker la valeur de l'input

  const [clicked, setClicked] = useState(false); //Pour pouvoir créer une condition que si c'est true, la task apparait

  const [tasks, setTasks] = useState([]); //Pour stock une array de toutes les tasks ajoutés et mapper sur elle grace à JSX dans return

  const [editingIndex, setEditingIndex] = useState(null); //Pour suivre le task édité
  const [editedTask, setEditedTask] = useState(""); //Cible le task édité

  const [checkedTasks, setcheckedTasks] = useState([]); //Array pour suivre le checkedTasks status for each task

  const [status, setStatus] = useState("")

  const updatedTasks = [...tasks];

  //Pour déclencher le stockage de la value de l'input en onChange
  const handleValue = (e) => {
    setValue(e.target.value)
  }


  //Quand on click qur le bouton save task
  const handleClicked = () => {
    setClicked(true); //quand c'est true le task apparait
    setTasks([...tasks, value]); //ajout de la task écrite dans l'input, à la fin de l'array qui contient toutes les tasks et sur laquelle on va mapper
    setcheckedTasks([...checkedTasks, false]) //ajoute false à la fin de l'array (si on met que false, ça ne va metter que 1 false dans l'array)
    setValue(""); //value de l'input est vide pour ne pas affecter la tache ajoutée

  }
  //Pour delete un task
  const eraseTask = (index) => {
    const deleteTask = tasks.filter((_, i) => i !== index)
    const deleteCheckedTasks = checkedTasks.filter((_, i) => i !== index) //Pour updater l'array qui contient les checked task et que ça se supprime comme les tasks non barrés
    setTasks(deleteTask);
    setcheckedTasks(deleteCheckedTasks);
  }


  //editingIndex state revient null et donc fait apparaitre le stylo, la poubelle et le task précédemment écrit
  const handleCancel = () => {
    setEditingIndex(null)
  }


  //Pour éditer les tasks
  const handleUpdate = (index) => {
    updatedTasks[index] = editedTask; //element ciblé va être value de la state editedTask
    setTasks(updatedTasks);
    setEditingIndex(null); //Pour revenir au stylo et poubelle quand on clique sur update
    setEditedTask(""); //Pour que quand on va encore update, ça revient pas à la valeur d'avant
  };

  //Pour pouvoir barré chaque task sans barrer toutes les autres en même temps
  // Dans handleclicked: on a donné à chaque element la property checked: false par défaut; quand on clique sur save task
  const handlecheckedTasks = (index) => {
    const updatedCheckedTasks = [...checkedTasks]; //crée une copie du tableau checkedTasks et store dans cette variable, pour ne pas changer le tableau d'origine lors de modification
    updatedCheckedTasks[index] = !updatedCheckedTasks[index]; //false devient true quand on clique / On inverse chaque valeur contenu dans la copie de l'array checkedTasks, stocké dans updatedCheckedTasks / 
    setcheckedTasks(updatedCheckedTasks);
  }

  //Pour créer des catégories

  const handleStatus = (mode) => {
    setStatus(mode);
  }

  //Pour sort les catégories dans l'ordre et l'une après l'autres au lieu de les laisser dans leur positions
  const getSortedTasks = () => {
    if (status === "done") {
      return tasks
        .map((element, index) => ({ element, index }))//Syntax de Notation qui donne un objet avec 2 properties et les valeus de l'array [{e: "task1", i:0}, {e:"task2", i:1}, ...etc]
        .filter(({ index }) => checkedTasks[index] === true)//Maintenant on ne garde dans cette array que les tasks qui ont été checked, grâce aux index
        // .sort((a, b) => a.element.localeCompare(b.element))//the tasks are sorted alphabetically in a locale-sensitive manner (ordre alphabétique) le task de la property a est comparé au task de la property b et sont mis dans un ordre alphabétique
        .map(({ element, index }) => ({ element, index }));//Puis on revient à la structure originiale
    }
    else if (status === "todo") {
      return tasks
        .map((element, index) => ({ element, index }))
        .filter((_, index) => !checkedTasks[index])
        // .sort((a, b) => a.element.localeCompare(b.element))
        .map(({ element, index }) => ({ element, index }));
    }
    return tasks.map((element, index) => ({ element, index }));
  };

  //Comme l'update methos est asynchronous, pour voir l'update du state, il faut faire le log dans useEffect
  // useEffect(() => {
  //   console.log(checkedTasks);
  // }, [checkedTasks])

  return (
    <div className="all-todo-list">

      <h1 className="new-task-title">Add a New Task</h1>

      <div className="add-a-task">
        <input className="input-add-task" type="text" placeholder="New task" value={value} onChange={handleValue} />
        <button className="btn-task" onClick={handleClicked}>Add Task</button> {/* onClick={handleClicked} appelle la function quand on click, car on n'ajoute pas de paramètre */}
      </div>

      <div className="the-task-list">
        <h1>To do list</h1>

        <div className="all-list-btn">
        <button className="all-btn" onClick={() => handleStatus('all')}>All Tasks</button>
        <button className="todo-btn" onClick={() => handleStatus('todo')}> To do</button>
        <button className="done-btn" onClick={() => handleStatus('done')}> Done </button>
        </div>

{/* Début map sur array stored dans task */}
        {clicked && getSortedTasks().map(({ element, index }) =>

          <div key={index} className="my-task">
            {editingIndex == index ?
              <input
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                placeholder={element}
              />
              :
              //Is status = done + checked=false (cache l'element qui n'est pas coché) + Si status=todo et checked=true (cache l'element qui est coché)
              <span className={`the-task ${status === 'done' && checkedTasks[index] == false ? 'hidden' : (status === 'todo' && checkedTasks[index] == true) ? 'hidden' : ''}   ${checkedTasks[index] ? 'task-barré' : 'the-task'}`} >
                {element}
              </span>
            }

            <div className="pen-trash">
              {editingIndex == index ?
                <div>
                  <button onClick={() => handleUpdate(index)}>Update</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
                :

                <div className={`${status === 'done' && checkedTasks[index] == false ? 'hidden' : status === 'todo' && checkedTasks[index] == true ? 'hidden' : ''}`}>
                  <input type="checkbox" onClick={() => handlecheckedTasks(index)} checked={checkedTasks[index]} /> {/*si checkedTasks=true sera coché et restera coché même si o nchange de catégorie / Si false, ne sera plus coché*/}
                  <FaRegPenToSquare onClick={() => setEditingIndex(index)} />
                  <FaRegTrashAlt onClick={() => eraseTask(index)} />
                </div>
              }
            </div>
          </div>
        )}
      </div>
      {/* Fin map dans array stored dans task */}


    </div>
  )
}
