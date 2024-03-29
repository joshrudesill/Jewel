import { useEffect, useState } from "react";

const useScreenSize = () => {
    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      })
    
    const detectSize = () => {
      detectHW({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      })
    }

    useEffect(() => {
      window.addEventListener('resize', detectSize)

      return () => {
        window.removeEventListener('resize', detectSize)
      }
    }, [windowDimenion])

    return {
        width: windowDimenion.winWidth,
        height: windowDimenion.winHeight
    }
}

export default useScreenSize;