import '../style.css'
import { DisplayWetherComponentProps, Days, Hours } from '../types'

const DisplayWeatherComponent = ({ data }: DisplayWetherComponentProps) => {

    function displayHour(time: string) {
        return time.split(':')[0]
    }

    function displayTemp(temp: number) {
        if (!temp) return
        return `${Math.round(temp).toString()}°`
    }

    function showMoreDetails(index: number) {
        const hoursContainer = document.getElementsByClassName('hours-container')[index] as HTMLDivElement
        hoursContainer.classList.toggle('hide')
    }


    return (
        <div className='data-display-container'>
                <h4>{data?.city}</h4>
                <h2>{displayTemp(data?.currentTemp!)}</h2>
                <div className='frecast-display-container'>
                    {data?.days?.map((day: Days, index: number) => (
                        <div key={index} className='days-container'>
                            <div className='days-data-only-container'>
                                <p>{day?.datetime}</p>
                                <img src={`src/assets/icon/${day.icon}.svg`} alt={day.icon} className='icon-display' />
                                <p>{`L: ${displayTemp(day?.tempmin)}`}</p>
                                <p>{`Temp ${displayTemp(day?.temp)}`}</p>
                                <p>{`H: ${displayTemp(day?.tempmax)}`}</p>
                                <button onClick={() => showMoreDetails(index)} className='detail-btn'>More details</button>
                            </div>
                            <div className={`hours-container ${index === 0 ? '' : 'hide'}`}>
                                {day?.hours?.map((hour: Hours, index: number) => (
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
    )
}

export default DisplayWeatherComponent