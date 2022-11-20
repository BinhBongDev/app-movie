import {BrowserRouter} from 'react-router-dom'

import './App.scss';

import Header from './components/Header';

import Routess from './configRoute/Routes';

function App() {

  
  return (
    <BrowserRouter>
      <Header />
      <Routess />

    </BrowserRouter>
  );
}

export default App;
