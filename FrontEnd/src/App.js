import Login from './components/Login'
import './App.css';
import CurrentWeather from './components/CurrentWeather'
import WeatherPrediction from './components/WeatherPrediction'
import { Route, Routes } from 'react-router-dom'
import Error from './screen/Error'
import Signup from './components/SignUp'

function App() {
  return (
    <div className=".container">
      {/* <Header /> */}
      {/* <Login /> */}

      {/* <RainBarChart /> */}
      {/* <Test /> */}

      <Routes>
        <Route path='/' element={<CurrentWeather />} />
        <Route path='/welcome' element={<WeatherPrediction />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>


    </div>
  );
}

export default App;
