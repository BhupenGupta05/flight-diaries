import diaries from '../../data/entries'
import { NonSensitiveDiaryEntry, DiaryEntry } from '../types'

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id, 
        date, 
        weather, 
        visibility
    }))
}

const getEntries = (): DiaryEntry[] => {
    return diaries
}

const addDiary = () => {
    return null
}

export default {
    getEntries, 
    getNonSensitiveEntries,
    addDiary
}