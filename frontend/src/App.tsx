import React, { useEffect, useState } from "react"
import { ErrorResponse, createDiary, getAllDiaries } from "./services/diaryService"
import { Diary } from "./types"
import { AxiosError } from "axios"

const App = () => {
  const [newDiary, setNewDiary] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: ""
  })
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [error, setError] = useState<ErrorResponse | string>("")

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  },[])

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault()

    createDiary({ date: newDiary.date,
    weather: newDiary.weather,
    visibility: newDiary.visibility,
    comment: newDiary.comment })
    .then(data => {      
      setDiaries([...diaries, data])   
      setNewDiary({
        date: "",      
        weather: "",
        visibility: "",
        comment: ""
      }) 
      setError("")
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        console.log(error.response.data);
        
        // Server responded with a status code other than 2xx
        const responseData = error.response.data as ErrorResponse
        setError(responseData);
      } else if (error.request) {
        // The request was made but no response was received
        setError("Network error. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An error occurred. Please try again later.");
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDiary(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {typeof error === 'string' ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p style={{ color: "red" }}>{error.message}</p>
      )}
      <form onSubmit={diaryCreation}>
        date: <input type="date" name="date" value={newDiary.date} onChange={handleInputChange} />
        weather: <input type="text" name="weather" value={newDiary.weather} onChange={handleInputChange} />
        visibility: <input type="text" name="visibility" value={newDiary.visibility} onChange={handleInputChange} />
        comment: <input type="text" name="comment" value={newDiary.comment} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <p><b>{diary.date}</b></p>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
        </div>
      ))}
    </div>
  )
}

export default App