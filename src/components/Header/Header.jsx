import { useState, useEffect } from 'react'

import { changeNumberLength } from '../../utils/utilityFunctions/changeNumberLength'
import st from './Header.module.scss'

const Header = ({ getRate }) => {
   const [eurRate, setEurRate] = useState(0)
   const [usdRate, setUsdRate] = useState(0)

   useEffect(() => {
      const getCurrentRates = async () => {
         const eur = await getRate('eur', 'uah', 1)
         const usd = await getRate('usd', 'uah', 1)
         setEurRate(eur || 0)
         setUsdRate(usd || 0)
      }
      getCurrentRates()
   }, [getRate])

   return (
      <div className={st.header}>
         <div className={st.title}>Todays rates:</div>
         <div className={st.rates}>
            <div className={st.rate}>
               <span className={st.cur}>EUR:</span>
               <span className={st.value}>{changeNumberLength(eurRate)} UAH</span>
            </div>
            <div className={st.rate}>
               <span className={st.cur}>USD:</span>
               <span className={st.value}>{changeNumberLength(usdRate)} UAH</span>
            </div>
         </div>
      </div>
   )
}

export default Header
