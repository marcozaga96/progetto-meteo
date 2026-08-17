import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Spinner } from "react-bootstrap";
import WeeklyForecast from "./WeeklyForecast";
import "./WeatherApp.css";

const API_KEY = "ba34375fd9bf4551c4c3de118b34ee40";

const WeatherApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchByCity("Andria"),
      );
    } else {
      fetchByCity("Andria");
    }
  }, []);

  const fetchByCoords = (lat, lon) => {
    setLoading(true);
    Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`,
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`,
      ),
    ])
      .then(async ([res1, res2]) => {
        setCurrentWeather(await res1.json());
        setForecast((await res2.json()).list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchByCity = (cityName) => {
    setLoading(true);
    Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=it`,
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=it`,
      ),
    ])
      .then(async ([res1, res2]) => {
        if (!res1.ok || !res2.ok) throw new Error();
        setCurrentWeather(await res1.json());
        setForecast((await res2.json()).list);
        setLoading(false);
      })
      .catch(() => {
        alert("Città non trovata!");
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchByCity(searchQuery);
      setSearchQuery("");
    }
  };

  const handleGeolocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) =>
        fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      );
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "720px" }}>
      {/* Search Header */}
      <Form onSubmit={handleSearch} className="mb-4">
        <div className="position-relative d-flex align-items-center">
          <Form.Control
            type="text"
            className="search-pill w-100 pe-5"
            placeholder="Cerca un'altra città..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={handleGeolocationClick}
            className="btn position-absolute end-0 me-2 text-subtle border-0 bg-transparent"
            title="Posizione attuale"
          >
            📍
          </button>
        </div>
      </Form>

      {loading ? (
        <div className="text-center py-5">
          <Spinner
            animation="border"
            variant="info"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      ) : (
        currentWeather && (
          <>
            {/* Main Weather Card */}
            <Card className="glow-card border-0 text-center p-4 mb-4 position-relative overflow-hidden">
              <Card.Body className="py-3">
                <span className="text-uppercase tracking-wider text-accent fw-bold fs-7">
                  Meteo Attuale
                </span>
                <h1 className="display-4 fw-extrabold text-gradient my-1">
                  {currentWeather.name}
                </h1>
                <p className="text-capitalize text-subtle fs-6 mb-3">
                  {currentWeather.weather[0].description}
                </p>

                <div className="d-flex justify-content-center align-items-center my-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                    alt="Meteo"
                    style={{
                      width: "140px",
                      height: "140px",
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                    }}
                  />
                  <h1 className="display-1 fw-bold temp-gradient mb-0 ms-n3">
                    {Math.round(currentWeather.main.temp)}°
                  </h1>
                </div>

                {/* Grid Metriche */}
                <Row className="g-2 mt-4">
                  <Col xs={6} sm={3}>
                    <div className="stat-pill">
                      <small className="d-block text-subtle">Percepita</small>
                      <strong className="fs-6 text-subtle">
                        {Math.round(currentWeather.main.feels_like)}°C
                      </strong>
                    </div>
                  </Col>
                  <Col xs={6} sm={3}>
                    <div className="stat-pill">
                      <small className="d-block text-subtle">Umidità</small>
                      <strong className="fs-6 text-subtle">
                        {currentWeather.main.humidity}%
                      </strong>
                    </div>
                  </Col>
                  <Col xs={6} sm={3}>
                    <div className="stat-pill">
                      <small className="d-block text-subtle">Vento</small>
                      <strong className="fs-6 text-subtle">
                        {currentWeather.wind.speed} m/s
                      </strong>
                    </div>
                  </Col>
                  <Col xs={6} sm={3}>
                    <div className="stat-pill">
                      <small className="d-block text-subtle">Pressione</small>
                      <strong className="fs-6 text-subtle">
                        {currentWeather.main.pressure} hPa
                      </strong>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Previsioni Orarie Horizontal Scroll */}
            <h5 className="fw-bold mb-3 text-gradient">Nelle prossime ore</h5>
            <div className="hourly-scroll mb-4">
              {forecast.slice(0, 9).map((item, index) => (
                <Card
                  key={index}
                  className="glow-card border-0 text-center p-3"
                  style={{ minWidth: "100px" }}
                >
                  <small className="text-subtle">
                    {new Date(item.dt_txt).toLocaleTimeString("it-IT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt="icona"
                    className="mx-auto my-1"
                    style={{ width: "40px" }}
                  />
                  <strong className="fs-5 text-subtle">
                    {Math.round(item.main.temp)}°
                  </strong>
                </Card>
              ))}
            </div>

            {/* Componente Settimanale */}
            <WeeklyForecast forecastList={forecast} />
          </>
        )
      )}
    </Container>
  );
};

export default WeatherApp;
