import '../style.css'
import { useState, useEffect } from "react"
import axios, { AxiosError } from 'axios'
import { SearchComponentProps } from '../types'

const SearchComponent = ({ handleData, handleError }: SearchComponentProps) => {

    const [citySearch, setCitySearch] = useState<string>()

    useEffect(() => {
        handleError('')
        fetchData(citySearch!)
    }, [citySearch])

    async function fetchData(cityParam: string) {
        if (!cityParam) return
        const url = `http://localhost:3000/weather/${cityParam}`
        try {
            const response = await axios.get(url)
            handleData(response.data)
            return response.data
        } catch (err: unknown) {
            const error = err as AxiosError
            console.error(err)
            if (error?.response?.status === 400) {
                handleError('*Invalid City or Country')
            }
            else {
                handleError('Error')
            }
        }
    }

    const searchBtn = document.getElementById('btn-search') as HTMLButtonElement
    searchBtn?.addEventListener('click', (e: MouseEvent) => handleForm(e))

    function handleForm(e: MouseEvent) {
        const inputCity = document.getElementById('input-city') as HTMLInputElement
        e.preventDefault()
        setCitySearch(inputCity.value)
        inputCity.value = ''
    }

    return (
        <div className='search-form-container'>
            <h1>Weather Forecast</h1>
            <form className='form-container'>
                <label>City | Country</label>
                <input type='text' id='input-city' />
                <button type='submit' id='btn-search'>Search</button>
            </form>
        </div>
    )
}

export default SearchComponent