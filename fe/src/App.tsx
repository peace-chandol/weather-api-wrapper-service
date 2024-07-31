import './style.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [citySearch, setCitySearch] = useState<string>()
    const [data, setData] = useState<any>()
    const [errMsg, setErrMsg] = useState<string>()

    useEffect(() => {
        setErrMsg('')
        fetchData(citySearch!)
    }, [citySearch])

    async function fetchData(cityParam: string) {
        if (!cityParam) return
        const url = `http://localhost:3000/weather/${cityParam}`
        try {
            const response = await axios.get(url)
            console.log('this is log data', response.data)
            setData(response.data)
            return response.data
        } catch (err: any) {
            console.error(err)
            if (err.response.status === 400) {
                setErrMsg('Invalid City or Country')
            }
            else {
                setErrMsg('Error')
            }
            setData(null)
        }
    }

    const searchBtn = document.getElementById('btn-search')
    searchBtn?.addEventListener('click', (e: MouseEvent) => handleForm(e))

    function handleForm(e: MouseEvent) {
        const inputCity = document.getElementById('input-city') as HTMLInputElement
        e.preventDefault()
        setCitySearch(inputCity.value)
        inputCity.value = ''
    }

    return (
        <>
            <h1>Weather Forecast</h1>
            <form>
                <label>City :</label>
                <input type='text' id='input-city' />
                <button type='submit' id='btn-search'>Search</button>
            </form>

            <div>
                <h1>For show Weather!</h1>
                {errMsg}
                <h2>{data?.city}</h2>
                <p>{data?.currentTemp}</p>
                {/* DO: display data */}
            </div>
        </>
    )
}

export default App
