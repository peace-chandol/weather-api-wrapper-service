import './style.css'
import { useState } from 'react'
import SearchComponent from './components/SearchComponent'
import ErrorComponent from './components/ErrorComponent'
import DisplayWeatherComponent from './components/DisplayWeatherComponent'
import { Data } from './types.ts'

function App() {

    const [data, setData] = useState<Data | null>(null)
    const [errorMsg, setErrorMsg] = useState<string>('')

    const handleData = (data: Data | null) => {
        setData(data)
    }

    const handleError = (errorMsg: string) => {
        setErrorMsg(errorMsg)
    }

    return (
        <div className='container'>
            <SearchComponent handleData={handleData} handleError={handleError} />
            {errorMsg ? <ErrorComponent errorMsg={errorMsg} /> : <DisplayWeatherComponent data={data} />}
        </div>
    )
}

export default App
