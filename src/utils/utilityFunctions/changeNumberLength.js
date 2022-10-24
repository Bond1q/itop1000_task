export const changeNumberLength = (number) => {
   if (!isNaN(number)) {
      return (+number).toFixed(2)
   }
   return number
}
