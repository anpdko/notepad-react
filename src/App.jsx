import React, {useContext} from 'react';
import './App.scss';
import Routes from './Routes'
import {BrowserRouter} from 'react-router-dom'

import {useAuthState} from 'react-firebase-hooks/auth'
import Context from './contexts/Context'

function App() {
  const {auth} = useContext(Context)
  const loading = useAuthState(auth)[1]

  if(loading){
    return <h1>.......</h1>
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes/>
      </div>
    </BrowserRouter>
  );
}

export default App;
