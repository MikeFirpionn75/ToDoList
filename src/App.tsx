import { useState, useEffect, createContext } from 'react'
// import useCountDown from './useCountDown'

import './App.css'
import ButtonDoNow from './ButtonDoNow'
import ButtonImDone from './ButtonImDone'

export interface Props {
  id: number
  text : string
  finished : boolean
}

export interface temps{
  red: Boolean
  minute : number
  seconde : number
}

export type BolossMarc = {
  mode: boolean
  setMode: React.Dispatch<React.SetStateAction<boolean>>
}


export const DarkModeContext = createContext<BolossMarc | null >(null)

  // const [countDownValue, setCountDownValue] = useCountDown(1500)

function App() {
const [mode, setMode] = useState(false)


  const [value, setValue] = useState<string>('')


  

  const [task, setTask] = useState<Props[]>(() => {
    const getList = localStorage.getItem('list')
    if (getList){
      return JSON.parse(getList)
    }else{
      let task1:Props = {id:40, text:'Faire la vaisselle', finished:false}
      let task2:Props = {id:7568, text:'Ranger la chambre', finished:false}
      let task3:Props = {id:98645, text:'Faire à manger', finished:false}
      return [task1, task2, task3]
    }
  })

  const [taskCurent, setTaskCurent] = useState<JSX.Element>(<p>Not curently doing anything</p>)

  useEffect(()=> {
    localStorage.setItem('list',JSON.stringify(task) )
  }, [task])

  const mafunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputCopy = [...task]
    inputCopy.push({
      id : task.length,
      text : value,
      finished : false
    })
  
    setTask(inputCopy)
    setValue('')
  }

  const remove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, elem : Props) =>{
    e.preventDefault();

    const taskCopy = [...task]
    const element = taskCopy.indexOf(elem)
    taskCopy.splice(element,1)
    setTask(taskCopy)
    setTaskCurent(<p>Not curently doing anything</p>)
  }

  const statusCheck =(e:React.ChangeEvent<HTMLInputElement>, elem:Props ) =>{
      const newTask = [...task]
      const element = newTask.indexOf(elem)
      if (e.target.checked == false){
        newTask[element].finished = false  
     }else{
      newTask[element].finished = true 
      setTaskCurent(<p>Not curently doing anything</p>)
      }
      setTask(newTask)
  }

  const bar = () => {
    const arrayOfBool: boolean[] = []
    task.forEach(elem => arrayOfBool.push(elem.finished))
    const numberOfTrue = arrayOfBool.filter(bool => bool==true).length
    let pourcent = undefined
    if (task.length == 0){
      pourcent = 0
    }else{
      pourcent = numberOfTrue/task.length*100
    }
    
  return pourcent
  }
  const sizeOfProgress = {width:bar()+'%'}
  const number = Math.floor(bar())

  
  const [stringTask, setStringTask] = useState<Props>(task[0]) 
  const [color, setColor] = useState<{background: string}[]>([{background:'grey'},{background:'grey'}])
 
  
  const [timer, setTimer] = useState <temps> ({minute:25, seconde:59, red:false})

  const timerDecrement = () => {
    setTimer((prevTimer) => {
      if (prevTimer.seconde > 0){
        return {
          ...prevTimer,
          seconde: prevTimer.seconde - 1
          
        }
      }else if (prevTimer.minute > 0){
        
        console.log(typeof prevTimer)
      return {
        ...prevTimer,
        minute: prevTimer.minute - 1,
        seconde: 59
      }
      }
    
    else{
      return prevTimer
    }
  })
}

  useEffect(() => {
    if ((timer.red) && (taskCurent != <p>Not curently doing anything</p>)){
      const interval = setInterval(timerDecrement, 1000);
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [timer.red]);
  
  const colorTimer =()=> {
    const newColor = [...color]
    if (JSON.stringify(color[1]) == JSON.stringify({background:'rgba(244, 0, 0, 0.835)'})){
      console.log('bbb')
      newColor[1] = {background:'grey'}
 
    
    
    setColor(newColor)
    setTimer(() => {
      return {
        minute: 25,
        seconde: 0,
        red: !timer.red
      }
    })
    console.log(timer.red)  
  }
  }
  
  function click (){
    let copyMode = mode
    copyMode = !copyMode
    setMode(copyMode)
    console.log(mode)
  }
  return (
   
    <>
     <DarkModeContext.Provider value = {{mode, setMode}}>
     {/* {const {{mode, setMode}} = useContext(DarkModeContext) as BolossMarc} */}
    <div className='global'>
    <h1 className='title'>My dashboard</h1>
    <button className ='mode'onClick={() => click()}>{mode == false ? "Dark mode" : "Light mode"}</button>
    <div className='book'>
    <div className='set'style = {mode == true ? {backgroundColor:'#444'}: {backgroundColor:'rgb(238, 229, 217)'}}>
      <div id="progressBar">
      <div style = {sizeOfProgress} id="pourcent" >{number == 0 ? <span style = {{marginLeft:"5vh"}}>{number}%</span>:<span >{number}%</span>}</div>
      </div>
      <h1 style = {mode == true ? {color:'rgb(238, 229, 217)'}: {color:'#444'}}>My tasks</h1>
        {task.map((elem) => {
        return (
          <ul  className='list' key={elem.id} >
            <span className = 'checktask'>
            <input type="checkbox" id="scales" name="scales" checked = {elem.finished} onChange ={(e) => statusCheck(e, elem)}></input>
            <li> {elem.text}</li>
            </span>
            <span className='buttons'>
           <ButtonDoNow setStringTask = {setStringTask} color={color} elem={elem} setColor={setColor} setTaskCurent={setTaskCurent} ></ButtonDoNow>
            <button className ='cross' onClick = {e => remove(e, elem)}>X</button>
            </span>
          </ul>
        )
        })}
      <p>New task:</p>
      <form onSubmit = {e => mafunction(e)}>
        <input className = 'text 'value={value} onChange={(e)  => setValue(e.target.value)} ></input>
      </form>
    </div>
    <div className = 'displayTaskToDo'style = {mode == true ? {backgroundColor:'#444'}: {backgroundColor:'rgb(238, 229, 217)'}}>
        <h1 style = {mode == true ? {color:'rgb(238, 229, 217)'}: {color:'#444'}}>Currently doing</h1>
        <div>{taskCurent}</div>
        <div className='taskCurentButton'>
        <ButtonImDone color={color} setColor={setColor} setTask={setTask} setTaskCurent={setTaskCurent} setTimer={setTimer} stringTask={stringTask} task={task} taskCurent={taskCurent}></ButtonImDone>

        <button onClick={()=>colorTimer()} style = {color[1]}>Start 25' timer</button>
        </div>
        {timer.red == true && (timer.minute > 0 || timer.seconde > 0)? <span className='timer'>{timer.minute}:{timer.seconde} </span> : 
        timer.red == true && timer.minute == 0 && timer.seconde == 0? <span className='timeUp'>Time's Up</span> : null}
        </div>
    </div>
    </div>

    </DarkModeContext.Provider>
    </>
  )
}

export default App
