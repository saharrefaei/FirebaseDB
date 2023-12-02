import React from 'react';
import './App.css';
import { useLocation, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InputFireBase from './components/inputPage/index'
import Users from './components/Users/index'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <InputFireBase/> */}
      <Routes>
                <Route path="" element={<Navigate to={'/InputFireBase'} />} />


                <Route path={"/MainPage"} element={<InputFireBase />} />
                <Route path={"/UsersInDB"} element={<Users />} />
                
                <Route
                path="*"
                element={
                    <div>
                        <h2>Page not found</h2>
                    </div>
                }
            />
        </Routes>
      </header>
    </div>
  );
}

export default App;
