
import './App.css';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import About from './components/About/About';
import Auth from "./components/Auth/Auth";
// import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar>

      </Navbar>
        <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/users/:userId' component={User}></Route>
        <Route exact path='/about' component={About}></Route>
        {/*    eğer localstorage da user kayıtlı ise yani giriş yapılı ise home yani anasayfaya yönlendir. değilse auth sayfasına yönlendir.*/}
        <Route exact path='/auth'>
            {localStorage.getItem("currentUser") != null ? <Redirect to="/"/> : <Auth/>}
        </Route>
        </Switch>

      </BrowserRouter>


    </div>
  );
}

export default App;
