import { NewDiaryEntry, Weather, Visibility } from "./types";

// TYPE GUARD
// 'text is String' is a type predicate; gneral form is parameterName is Type
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const parseComment = (comment: unknown): string => {
    if(!isString(comment)) {
        throw new Error('Incorrect comment')
    }
    return comment
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date)
    }
    return date
}

const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param)
}

const parseWeather = (weather: unknown): Weather => {
    if(!isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect weather: ' + weather)
    }
    return weather
}

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param)
}

const parseVisibility = (visibility: unknown): Visibility => {
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect visibility: ' + visibility)
    }
    return visibility
}

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect data')
    }

    if('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: NewDiaryEntry = {
            comment: parseComment(object.comment),
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility)
        }
        return newEntry
    }
    throw new Error('Incorrect data: some fields are missing')
}

export default toNewDiaryEntry