import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [city, setCity] = useState(null);
  const [submitCity, setSubmitCity] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCity(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitCity(city);
    console.log(submitCity);
    navigate("/details", { state: { city } });
    setCity("");
  };

  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid justify-content-center">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search city"
              value={city}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onSubmit={handleSubmit}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
