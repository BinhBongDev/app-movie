import {BrowserRouter} from 'react-router-dom'

import './App.scss';

import Header from './components/Header';

import Footer from './components/Footer'

import Routess from './configRoute/Routes';

function App() {

  
  return (
    <BrowserRouter>
      <Header />
      <Routess />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
