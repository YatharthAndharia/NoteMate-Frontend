import { use, useState } from 'react'
import './App.css'
import Cards from './components/Cards'
import Searchbar from './components/Search'
import Inputs from './components/Inputs'
import ChatBot from "react-chatbotify";
import Signup from './components/Signup';
import Navbar from './components/Navbar';


function App() {
  const [search, setSearch] = useState(null)
  const [isLogIn, setIsLogIn] = useState(false);
  // const id = "my-chatbot-id"
  // const flow = {
  //   "start": {
  //       message: "Hello there!",
  //       path: "end"
  //   },
  //   "end": {
  //       message: "See you, goodbye!"
  //   }
  // }
  return (
    <div>
      <Navbar isLogIn={isLogIn} setIsLogIn={setIsLogIn} search={search} setSearch={setSearch}/>
    {/* <Searchbar setSearch={setSearch}/>
    <Signup/> */}
    {/* <Inputs/>
    <Cards search={search} setSearch={setSearch}/> */}
    {/* <ChatBot id={id} flow={flow}/> */}
    </div>
  )
}

export default App
