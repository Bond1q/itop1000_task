import React from 'react'

import st from './Loader.module.scss'

const Loader = () => {
   return (
      <div className={st.loader}>
         <div className={st.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </div>
   )
}

export default Loader
