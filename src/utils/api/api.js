import axios from 'axios'

const URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'

export const requestSymbols = async () => {
   try {
      const res = await axios.get(URL + '.min.json')
      return res.data
   } catch (error) {
      console.log(error)
   }
}

export const requestRate = async (currency) => {
   try {
      const res = await axios.get(URL + `/${currency}.json`)
      return res.data
   } catch (error) {
      console.log(error)
   }
}
