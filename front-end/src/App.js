import './App.css';
import {BrowserRouter ,Route,Link, useHistory} from "react-router-dom"
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import MainPage from './Components/MainPage';

function App() {
  return (
    <div>
      <MainPage/>
    </div>
  );
}

export default App;
