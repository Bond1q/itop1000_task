import React from 'react'
import cn from 'classnames'

import st from './CurrenciesList.module.scss'

const CurrenciesList = ({ symbols, isActive, chooseCurrency, pattern }) => {
   return (
      <div className={cn({ [st.active]: isActive }, st.currenciesList)}>
         {symbols
            .filter((el) => {
               if (pattern.length === 0) return true
               return el.symbols.includes(pattern)
            })
            .map((el) => (
               <div
                  onClick={() => {
                     chooseCurrency(el.symbols)
                  }}
                  className={st.currency}
                  key={el.symbols}
               >
                  <span>{el.symbols}</span>-<span>{el.fullName}</span>
               </div>
            ))}
      </div>
   )
}

export default CurrenciesList
