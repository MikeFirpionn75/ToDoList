import { useContext } from "react";
import { BolossMarc, DarkModeContext, Props, temps } from "./App";


interface MyButtonImDone{
    taskCurent : JSX.Element;
    color: {
        background: string;
    }[];
    stringTask: Props;
    setColor : React.Dispatch<React.SetStateAction<{
        background: string;
    }[]>>;
    setTask: React.Dispatch<React.SetStateAction<Props[]>>;
    setTaskCurent: React.Dispatch<React.SetStateAction<JSX.Element>>;
    setTimer:React.Dispatch<React.SetStateAction<temps>>;
    task: Props[];
}

export default function ButtonImDone (props: MyButtonImDone){
    const {taskCurent, color, stringTask, setColor, setTask, setTaskCurent, setTimer, task} = props
    // const {mode, setMode} = useContext(DarkModeContext) as BolossMarc


    const done = () =>{
        if ( taskCurent != <p>Not curently doing anything</p>){
          const newColor = [...color]
          newColor[0] = {background:'grey'}
          setColor(newColor)
        }
      }
    
      const remove2 = (task: Props[]) => {
        const index = task.indexOf(stringTask)
        const newTask = [...task]
        newTask[index].finished = true
        setTask(newTask)
        setTaskCurent(<p>Not curently doing anything</p>)
        done()
        
        setTimer((prevTimer) => {
          return {
            ...prevTimer,
            red: false
          }
        })
      }
      return (
        <button onClick = {()=> remove2(task)} style = {color[0]}>I'm done 🚀</button>
      )
}