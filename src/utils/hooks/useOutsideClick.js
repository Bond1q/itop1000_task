import { useEffect } from 'react'

export const useOutsideClick = (ref, actionToDo) => {
   useEffect(() => {
      function handleClickOutside(event) {
         if (ref.current && !ref.current.contains(event.target)) {
            actionToDo()
         }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [ref, actionToDo])
}
