import Navbar from './components/Navbar';
import About from './components/About'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>

      <Routes>

      <Route exact path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/register' element={<Register/>}/>
      </Routes>
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
