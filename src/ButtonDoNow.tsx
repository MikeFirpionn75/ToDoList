import { Props } from "./App";

interface ButtonDoNowProps {
    setStringTask: React.Dispatch<React.SetStateAction<Props>>;
    setTaskCurent: React.Dispatch<React.SetStateAction<JSX.Element>>;
    setColor: React.Dispatch<React.SetStateAction<{
        background: string;
    }[]>>;
    color:{
        background: string;
    }[]
    elem:Props
}

export default function ButtonDoNow (props: ButtonDoNowProps){
    const { setStringTask, setTaskCurent, setColor, color, elem } = props
    

    const doNow = (elem: Props) => {
        if (elem.finished == false ){

            const newh1 = <p>{elem.text}</p>
            const newStringh1 = elem
            setStringTask(newStringh1)
            setTaskCurent(newh1)
            const newColor = [...color]
            newColor[0]= {background:'cadetblue'}
            newColor[1]= {background:'rgba(244, 0, 0, 0.835)'}
        
            setColor(newColor)
        }
      }

    return(
        <button className ='doNow'onClick = {() => doNow(elem)} > Do now</button>
    )


}