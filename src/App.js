import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './Main';
import MartoCiso from './MartoCiso/MartoCiso';





function App() {
  return (
      <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Main />} />
          <Route path='/marto' element={<MartoCiso />} />
        </Routes>
      </BrowserRouter>
  );

}

export default App;
