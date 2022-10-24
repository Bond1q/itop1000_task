export const areCurrencySymbolsCorrect = (symbolsList, symbols) => {
   return symbols.toLowerCase() in symbolsList
}
