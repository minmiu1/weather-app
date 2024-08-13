import React, {useState, useEffect} from 'react'

const api = {
    key:'d8722321227961130ad51647c6dd39ea',
    base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
    const [searchInput, setSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [weatherInfor, setWeatherInfor] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput)
    }

    useEffect(() => {
        const fetchWeatherData = async () => {
            // ngăn chặn useEffect chạy trong lần đầu vì searchCity là 1 array dependency rỗng
            if (!searchCity) return
            setLoading(true)
            // Process
            try {
                const response = await fetch(`${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`)
                const data = await response.json()
                console.log(data)
                if (response.ok) {
                    setWeatherInfor(`${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`)
                    setErrorMessage("")
                 } else {
                    setErrorMessage(data.message)
                 }
            } catch (error) {
                setErrorMessage(error.message)
            }
            setLoading(false)
        }
        fetchWeatherData()
    }, [searchCity])


  return (
    <>
       <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Enter city name" 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
       </form>
       {loading ? (<div>Loading. . .</div>) : (
        <>
        {errorMessage ? ( 
       <div style={{color: "red"}}>{errorMessage}</div>
       ) : (
       <div>{weatherInfor}</div>
       )}
        </>
       )}
    </>
  )
}

export default App
