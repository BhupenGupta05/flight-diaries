import diaries from '../../data/entries'
import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types'

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id, 
        date, 
        weather, 
        visibility
    }))
}

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id)
    return entry
}

const getEntries = (): DiaryEntry[] => {
    return diaries
}

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEnrty = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    }
    diaries.push(newDiaryEnrty)
    return newDiaryEnrty
}

export default {
    getEntries, 
    findById,
    getNonSensitiveEntries,
    addDiary
}