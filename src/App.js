import { useState, useEffect } from "react"
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import About from "./Components/About";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () =>{
      const tasksFromserver = await fetchTasks()
      setTasks(tasksFromserver)
    }
    
    getTasks()
  },[])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await  fetch('http://localhost:5000/tasks')
     const data = await res.json()
     
      return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await  fetch(`http://localhost:5000/tasks/${id}`)
     const data = await res.json()
     
      return data
  }

//delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: "DELETE"
  })
  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder:!taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(updTask)
  })
  const data = await res.json()

  setTasks(tasks.map((task)=> task.id === id? {...task, reminder: data.reminder} : task))
}

//Add Task
const addTask =  async (task) => {
const res = await fetch('http://localhost:5000/tasks',{
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body:JSON.stringify(task)
})

const data = await res.json()
setTasks([...tasks,data])
 
  
}

  return (
     <Router>
     <div className='container'>
     <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
     {showAddTask && <AddTask onAdd={addTask} />}
     {/* {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No Task to show' }
     <Routes>
       <Route path='/about'  element={<About/>}/>
     </Routes> */}
     <Routes>
          <Route path='/' element={
              <>
                 {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No Task to show' }
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
     <Footer/>
     </div>
     </Router>
    
  );
}


export default App;

