import { useState, useEffect } from 'react'

type UseCountDownType = [number, React.Dispatch<React.SetStateAction<number>>]

const useCountDown = (second: number): UseCountDownType =>{
    
    const [timer, setTimer] = useState(second)
    
    const timerDecrement = () => {
        setTimer((prevNewTimer) => {
            let newVal = prevNewTimer <=0 ? 0 : prevNewTimer - 1
            return newVal
        })
      }

    useEffect(()=>{
        let interval = setInterval(timerDecrement, 1000)

        return () => clearInterval(interval)
    }, [])
    
    return [timer, setTimer]
}

export default useCountDown