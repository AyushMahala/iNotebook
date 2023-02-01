import './App.css';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
