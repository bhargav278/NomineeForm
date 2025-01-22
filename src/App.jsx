import { Outlet } from 'react-router-dom'
import AppContext from './Contex.jsx'
import { useState } from 'react'
import './App.css'

function App() {
  // localStorage.setItem('data',JSON.stringify([{name:"bhargav",city:"rajkot"}]))
  let parsedData = JSON.parse(localStorage.getItem('data'))
  if(!parsedData){
    localStorage.setItem('data',JSON.stringify([]));
  }
  const [data,setData] = useState(parsedData);

  // console.log(data);

  return (
    <>
      <AppContext.Provider value={{data,setData}}>
        <Outlet />
      </AppContext.Provider>
    </>
  )
}

export default App
