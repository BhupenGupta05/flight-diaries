export type NewDiary = Omit<Diary, 'id'>

export interface Diary {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment: string
}