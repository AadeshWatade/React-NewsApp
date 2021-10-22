import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
const pageSize = 12;
const apiKey = process.env.REACT_APP_NEWS_API;

const [progress, setProgress] = useState(0)
const [mode, setMode] = useState('light')

// const toggleMode1 = () =>{var x = document.getElementsByClassName("card-body");
// var i;
// for (i = 0; i < x.length; i++) {
//   x[i].style.backgroundColor = "black";
// }
// }
// const toggleMode2 = () =>{var x = document.getElementsByClassName("card-body");
// var i;
// for (i = 0; i < x.length; i++) {
//   x[i].style.backgroundColor = "white";
// }
// }

const darkMode = () => {
  if(mode==='light'){
    setMode('dark')
    console.log('white')
    document.body.style.backgroundColor='#1b1f22'
    // document.cardBody.style.backgroundColor='black'
    // document.body.style.color='white'
    // document.getElementsByClassName("p2").style.backgroundColor = "black"
    // toggleMode1()

  }
  else{
    setMode('light')
    console.log('black')
    document.body.style.backgroundColor="white"
    // document.cardBody.style.backgroundColor="white"
    // document.body.style.color="black"
    // document.getElementById("p2").style.backgroundColor = "white"
    // toggleMode2()
  }
}

    return (
      <div>
        <Router>
        <Navbar mode={mode} darkMode={darkMode}/>
        <LoadingBar color='#f11946' height={3} progress={progress} />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} key='general' pageSize={pageSize} apiKey={apiKey} country='in' category='general' mode={mode}/></Route>
          <Route exact path="/business"><News setProgress={setProgress} key='business' pageSize={pageSize} apiKey={apiKey} country='in' category='business' mode={mode}/></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} key='entertainment' pageSize={pageSize} apiKey={apiKey} country='in' category='entertainment' mode={mode}/></Route>
          <Route exact path="/general"><News setProgress={setProgress} key='general' pageSize={pageSize} apiKey={apiKey} country='in' category='general' mode={mode}/></Route>
          <Route exact path="/health"><News setProgress={setProgress} key='health' pageSize={pageSize} apiKey={apiKey} country='in' category='health' mode={mode}/></Route>
          <Route exact path="/science"><News setProgress={setProgress} key='science' pageSize={pageSize} apiKey={apiKey} country='in' category='science' mode={mode}/></Route>
          <Route exact path="/sports"><News setProgress={setProgress} key='sports' pageSize={pageSize} apiKey={apiKey} country='in' category='sports' mode={mode}/></Route>
          <Route exact path="/technology"><News setProgress={setProgress} key='technology' pageSize={pageSize} apiKey={apiKey} country='in' category='technology' mode={mode}/></Route>
        </Switch>
        </Router>
      </div>
    )
  }

  export default App
