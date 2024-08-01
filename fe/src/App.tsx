import './style.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

    // FORM COMPONENT
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
            console.log('this is data', response.data)
            setData(response.data)
            return response.data
        } catch (err: any) {
            console.error(err)
            if (err.response.status === 400) {
                setErrMsg('*Invalid City or Country')
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

    // DISPLAY COMPONENT
    function displayHour(time: string) {
        return time.split(':')[0]
    }

    function displayTemp(temp: number) {
        if (!temp) return
        return `${Math.round(temp).toString()}°`
    }

    function showMoreDetails(index: number) {
        const hoursContainer = document.getElementsByClassName('hours-container')[index]
        hoursContainer.classList.toggle('hide')
    }

    return (
        <div className='container'>
            <div className='search-form-container'>
                <h1>Weather Forecast</h1>
                <form className='form-container'>
                    <label>City | Country</label>
                    <input type='text' id='input-city' />
                    <button type='submit' id='btn-search'>Search</button>
                </form>
            </div>

            <div className='error-msg-container'>
                <p>{errMsg}</p>
            </div>

            <div className='data-display-container'>
                <h4>{data?.city}</h4>
                <h2>{displayTemp(data?.currentTemp)}</h2>
                <div className='frecast-display-container'>
                    {data?.days?.map((day: any, index: number) => (
                        <div key={index} className='days-container'>
                            <div className='days-data-only-container'>
                                <p>{day?.datetime}</p>
                                <img src={`src/assets/icon/${day.icon}.svg`} alt={day.icon} className='icon-display' />
                                <p>{`L: ${displayTemp(day?.tempmin)}`}</p>
                                <p>{`Temp ${displayTemp(day?.temp)}`}</p>
                                <p>{`H: ${displayTemp(day?.tempmax)}`}</p>
                                <button onClick={() => showMoreDetails(index)}>More details</button>
                            </div>
                            <div className='hours-container hide'>
                                {day?.hours?.map((hour: any, index: number) => (
                                    <div key={index} className='single-hour-container'>
                                        <p className='hour-display'>{displayHour(hour.datetime)}</p>
                                        <img src={`src/assets/icon/${hour.icon}.svg`} alt={hour.icon} className='icon-display' />
                                        <p className='temp-display'>{displayTemp(hour.temp)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
