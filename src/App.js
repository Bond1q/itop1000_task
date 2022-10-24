import React, { useEffect, useState } from 'react'

import Converter from './components/Converter/Converter'
import Header from './components/Header/Header'
import Loader from './components/Loader/Loader'
import { requestRate, requestSymbols } from './utils/api/api'

function App() {
   const [symbols, setSymbols] = useState({})
   const [isLoading, setIsLoading] = useState(true)

   const getRate = async (from, to, amount) => {
      const res = await requestRate(from)
      return res[from][to] * amount
   }

   useEffect(() => {
      const getSymbols = async () => {
         const res = await requestSymbols()
         setSymbols(res)
      }
      setIsLoading(true)
      getSymbols()
      setIsLoading(false)
   }, [])

   return (
      <div className='App'>
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <Header getRate={getRate} />

               <Converter getRate={getRate} symbols={symbols} />
            </>
         )}
      </div>
   )
}

export default App
