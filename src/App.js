
import './App.css';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, Routes,Switch} from "react-router-dom";
import About from './components/About/About';
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
        </Switch>

      </BrowserRouter>
      {/* <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/users/:userId" element={<User/>}></Route>
      </Switch>
      </BrowserRouter> */}

    </div>
  );
}

export default App;
