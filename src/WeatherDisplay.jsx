import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function WeatherDisplay() {
  const api_key = "abdc5404f1fd427084d234029252101";
  const para = useLocation();
  const city = para.state?.city || "No city provided";
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=10`
      )
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [city]);

  if (error) {
    return (
      <center>
        <p>Error: {error}</p>
      </center>
    );
  }

  if (!data) {
    return (
      <center>
        <p>Loading...</p>
      </center>
    );
  }

  // Destructuring the fetched data
  const {
    location: { name, country, localtime, tz_id },
    forecast: { forecastday },
    current: {
      condition: { text: weatherCondition },
      feelslike_c,
      temp_c,
      humidity,
      precip_mm,
      pressure_mb,
      uv,
      vis_km,
      wind_dir,
      wind_kph,
      last_updated,
    },
  } = data;
  // Get the local date for comparison
  const localDate = localtime.split(" ")[0];

  // Filter the forecast for the local date only for hourly data
  const localDayForecast = forecastday.find((day) => day.date === localDate);

  return (
    <section className="vh-10" style={{ backgroundColor: "#f5f6f7" }}>
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "40px" }}
            >
              <div className="bg-image" style={{ borderRadius: "3px" }}>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                  className="card-img"
                  alt="weather"
                />
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(244, 100, 11, 0.5)" }}
                ></div>
              </div>
              <div className="card-img-overlay text-dark p-5">
                <h4 className="mb-2 text-center">{`${name}, ${country}`}</h4>
                <h1 className="mb-1 text-center">{`${temp_c}°C`}</h1>
                <h3 className="mb-4 text-center">{`${weatherCondition}`}</h3>
                <div className="row">
                  <div className="col-6">
                    <p className="mb-2">
                      <strong>High: </strong>
                      {`${forecastday[0].day.maxtemp_c}°C`}
                      <strong> {"|"} </strong>
                      <strong>Low: </strong>
                      {`${forecastday[0].day.mintemp_c}°C`}
                    </p>

                    <p className="mb-2">
                      <strong>Wind Direction:</strong> {wind_dir}
                    </p>
                    <p className="mb-2">
                      <strong>Humidity:</strong> {humidity}%
                    </p>
                    <p className="mb-2">
                      <strong>Pressure:</strong> {pressure_mb}
                    </p>
                    <p className="mb-2">
                      <strong>Preciption:</strong> {precip_mm}
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="mb-2">
                      <strong>Feels Like:</strong> {feelslike_c}°C
                    </p>
                    <p className="mb-2">
                      <strong>Wind Speed:</strong> {wind_kph}
                    </p>
                    <p className="mb-2">
                      <strong>UV Index:</strong> {uv} kph
                    </p>
                    <p className="mb-2">
                      <strong>Visibility:</strong> {vis_km} km
                    </p>
                    <p className="mb-2">
                      <strong>Last Update:</strong> {last_updated}
                    </p>
                  </div>
                </div>
                <h3 className="mb-0 text-center">{`${localtime}`}</h3>
                <h3 className="mb-2 text-center">{`${tz_id}`}</h3>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* Hourly Forecast Section */}
        <div className="mb-4">
          <h5 className="text-center mt-3 py-3 underline">
            Hourly Forecast for Today
          </h5>
          <div className="d-flex overflow-auto">
            {localDayForecast?.hour.map((hour, idx) => (
              <div
                key={idx}
                className="p-2 m-1 text-center"
                style={{
                  backgroundColor: "#e3f2fd",
                  borderRadius: "10px",
                  minWidth: "80px",
                  fontSize: "0.9rem",
                }}
              >
                <p>{hour.time.split(" ")[1]}</p>
                <p>{hour.temp_c}°C</p>
                <p>{hour.condition.text}</p>
              </div>
            ))}
          </div>
        </div>
        <hr />

        {/* 10 Days Forecast Section */}
        <div className="row">
          <h5 className="text-center mt-3 py-3 underline">10 Days Forecast</h5>
          {forecastday.map((day, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card bg-light shadow"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-center">{day.date}</h5>
                  <p className="text-center">{day.day.condition.text}</p>
                  <div className="row">
                    <div className="col-6">
                      <p>
                        <strong>Max Temp:</strong> {day.day.maxtemp_c}°C
                      </p>
                      <p>
                        <strong>Sunrise:</strong> {day.astro.sunrise}
                      </p>
                    </div>

                    <div className="col-6">
                      <p>
                        <strong>Min Temp:</strong> {day.day.mintemp_c}°C
                      </p>

                      <p>
                        <strong>Sunset:</strong> {day.astro.sunset}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeatherDisplay;
