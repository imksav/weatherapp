import { Route, Router, Routes } from "react-router-dom";
import WeatherDisplay from "./WeatherDisplay";
import Home from "./Home";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/details" element={<WeatherDisplay />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
