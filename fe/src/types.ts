export interface Data {
    city: string,
    currentTemp: number,
    days: Days[]
}

export interface Days {
    datetime: string,
    tempmax: number,
    tempmin: number,
    temp: number,
    precipprob: number,
    conditions: string,
    icon: string,
    hours: Hours[]
}

export interface Hours {
    datetime: string,
    temp: number,
    precipprob: number,
    conditions: string,
    icon: string
}

export interface SearchComponentProps {
    handleData: (data: Data | null) => void
    handleError: (errorMsg: string) => void
}

export interface ErrorMsgProps {
    errorMsg: string
}

export interface DisplayWetherComponentProps {
    data: Data | null
}