import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './Main';
import MartoCiso from "./MartoCiso/MartoCiso";
import Templates from "./Templates/Templates";


function App() {
  return (
      <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Main />} />
          <Route path='/marto' element={<MartoCiso/>} />
          <Route path='/templates' element={<Templates/>}/>
        </Routes>
      </BrowserRouter>
  );

}

export default App;
