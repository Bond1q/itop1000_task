import React, { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'

import CurrenciesList from '../CurrenciesList/CurrenciesList'
import { useOutsideClick } from '../../utils/hooks/useOutsideClick'
import { changeNumberLength } from '../../utils/utilityFunctions/changeNumberLength'
import { areCurrencySymbolsCorrect } from '../../utils/utilityFunctions/areCurrencySymbolsCorrect'
import st from './Converter.module.scss'

const Converter = ({ getRate, symbols }) => {
   const [isListOfCurrenciesFrom, setIsListOfCurrenciesFrom] = useState(false)
   const [isListOfCurrenciesTo, setIsListOfCurrenciesTo] = useState(false)

   const [currencyFromName, setCurrencyFromName] = useState('usd')
   const [currencyFromAmount, setCurrencyFromAmount] = useState(1)

   const [currencyToName, setCurrencyToName] = useState('uah')
   const [currencyToAmount, setCurrencyToAmount] = useState(1)

   const ref1 = useRef(null)
   const ref2 = useRef(null)

   useOutsideClick(ref1, () => {
      setIsListOfCurrenciesFrom(false)
   })
   useOutsideClick(ref2, () => {
      setIsListOfCurrenciesTo(false)
   })

   const formik = useFormik({
      initialValues: {
         amountFrom: currencyFromAmount,
         amountTo: currencyToAmount,
         convertFrom: currencyFromName,
         convertTo: currencyToName,
      },
      validationSchema: Yup.object({
         amountFrom: Yup.number().required('amount from is required'),
         amountTo: Yup.number().required('amount to is required'),
         convertFrom: Yup.string()
            .test('areCorrectCurrency', 'cur from incorrect', (value) => {
               return areCurrencySymbolsCorrect(symbols, value)
            })
            .required('convertFrom is required'),

         convertTo: Yup.string()
            .test('areCorrectCurrency', 'cur to incorrect', (value) => {
               return areCurrencySymbolsCorrect(symbols, value)
            })
            .required('convertTo is required'),
      }),

      onSubmit: (values) => {},
   })

   const isInputUncorrect = (inputName) => {
      return Boolean(formik.errors[inputName])
   }

   const symbolsArray = React.useMemo(() => {
      const arr = []
      Object.keys(symbols).forEach((key) => {
         if (key.length < 4) {
            arr.push({ symbols: key, fullName: symbols[key] })
         }
      })
      return arr
   }, [symbols])

   const setCurrencyFrom = (value) => {
      formik.setFieldValue('convertFrom', value)
      setRate(value, formik.values.convertTo, formik.values.amountFrom)
   }

   const setCurrencyTo = (value) => {
      formik.setFieldValue('convertTo', value)
      setRate(formik.values.convertFrom, value, formik.values.amountFrom)
   }

   const setRate = async (from, to, amount) => {
      if (
         areCurrencySymbolsCorrect(symbols, from) &&
         areCurrencySymbolsCorrect(symbols, to) &&
         !isNaN(amount)
      ) {
         const res = await getRate(from.toLowerCase(), to.toLowerCase(), amount)
         setCurrencyToAmount(res)
         setCurrencyToName(to)
         setCurrencyFromAmount(amount)
         setCurrencyFromName(from)
         formik.setFieldValue('amountTo', res)
      }
   }

   useEffect(() => {
      setRate('usd', 'uah', 1)
   }, [symbols])

   return (
      <div className={st.converter}>
         <form onSubmit={formik.handleSubmit}>
            <input
               id='amountFrom'
               type='text'
               value={changeNumberLength(formik.values.amountFrom)}
               onChange={(e) => {
                  formik.handleChange(e)
                  formik.setFieldValue('amountTo', currencyToAmount * e.target.value)
               }}
               onBlur={formik.handleBlur}
               placeholder='Amount'
               className={cn({ [st.error]: isInputUncorrect('amountFrom') })}
            />

            <div
               className={st.symbols}
               onClick={() => setIsListOfCurrenciesFrom(!isListOfCurrenciesFrom)}
               ref={ref1}
            >
               <input
                  autoComplete='off'
                  id='convertFrom'
                  type='text'
                  value={formik.values.convertFrom}
                  onChange={formik.handleChange}
                  placeholder='Currency'
                  onBlur={formik.handleBlur}
                  className={cn({ [st.error]: isInputUncorrect('convertFrom') })}
               />
               <CurrenciesList
                  pattern={formik.values.convertFrom}
                  chooseCurrency={setCurrencyFrom}
                  symbols={symbolsArray}
                  isActive={isListOfCurrenciesFrom}
               />
            </div>

            <span>in</span>
            <input
               id='amountTo'
               type='text'
               value={changeNumberLength(formik.values.amountTo)}
               onChange={(e) => {
                  formik.handleChange(e)
                  formik.setFieldValue(
                     'amountFrom',
                     isNaN(e.target.value / (currencyToAmount / currencyFromAmount))
                        ? e.target.value
                        : e.target.value / (currencyToAmount / currencyFromAmount),
                  )
               }}
               onBlur={formik.handleBlur}
               placeholder='Amount'
               className={cn({ [st.error]: isInputUncorrect('amountTo') })}
            />
            <div
               className={st.symbols}
               onClick={() => setIsListOfCurrenciesTo(!isListOfCurrenciesTo)}
               ref={ref2}
            >
               <input
                  autoComplete='off'
                  id='convertTo'
                  type='text'
                  value={formik.values.convertTo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Currency'
                  className={cn({ [st.error]: isInputUncorrect('convertTo') })}
               />
               <CurrenciesList
                  pattern={formik.values.convertTo}
                  chooseCurrency={setCurrencyTo}
                  symbols={symbolsArray}
                  isActive={isListOfCurrenciesTo}
               />
            </div>
         </form>
      </div>
   )
}

export default Converter
