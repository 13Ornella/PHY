import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage.jsx';
import Layout from './pages/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/loginPage';

const App = () => {
  const [pages, setPage] = useState("layout");
  return (
   < BrowserRouter>
    <Routes>
      <Route path="/" component={Layout}>
      <Route path="/index" component={IndexPage}/>
      <Route path="/login"  component={LoginPage} />
      <Route path="/register" component={RegisterPage}/>
      </Route>
    </Routes>
    </BrowserRouter>
      );    
}
export default App;