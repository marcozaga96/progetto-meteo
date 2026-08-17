import React, { useState } from "react";
import { Card, Row, Col, Collapse } from "react-bootstrap";

const WeeklyForecast = ({ forecastList }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const dailyForecasts = forecastList.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const handleCardClick = (dateTxt) => {
    const dateOnly = dateTxt.split(" ")[0];
    setSelectedDate(selectedDate === dateOnly ? null : dateOnly);
  };

  const selectedDayDetails = forecastList.filter((item) =>
    item.dt_txt.startsWith(selectedDate),
  );

  return (
    <div className="mt-5">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold m-0 text-gradient">Prossimi Giorni</h5>
        <small className="text-subtle">Tocca una scheda per i dettagli</small>
      </div>

      <Row className="g-3">
        {dailyForecasts.map((day, index) => {
          const dateOnly = day.dt_txt.split(" ")[0];
          const isSelected = selectedDate === dateOnly;

          return (
            <Col xs={12} key={index}>
              <Card
                className={`glow-card border-0 p-3 ${isSelected ? "bg-opacity-75" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(day.dt_txt)}
              >
                <Row className="align-items-center">
                  {/* Giorno */}
                  <Col
                    xs={4}
                    md={3}
                    className="fw-bold text-capitalize fs-6 text-subtle"
                  >
                    {getDayName(day.dt_txt)}
                  </Col>

                  {/* Icona & Descrizione */}
                  <Col
                    xs={5}
                    md={5}
                    className="d-flex align-items-center gap-2"
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="icona"
                      style={{
                        width: "45px",
                        height: "45px",
                        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                      }}
                    />
                    <span className="text-capitalize text-subtle small d-none d-sm-inline">
                      {day.weather[0].description}
                    </span>
                  </Col>

                  {/* Temp Max / Min */}
                  <Col xs={3} md={4} className="text-end">
                    <span className="fw-bold fs-5 me-2 text-subtle">
                      {Math.round(day.main.temp)}°
                    </span>
                    <span className="text-subtle">
                      {Math.round(day.main.feels_like)}°
                    </span>
                  </Col>
                </Row>

                {/* Dettaglio Espandibile Orazio */}
                <Collapse in={isSelected}>
                  <div className="mt-3 pt-3 border-top border-white-10">
                    <div className="hourly-scroll">
                      {selectedDayDetails.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="stat-pill text-center d-flex flex-column align-items-center justify-content-center"
                          style={{ minWidth: "85px" }}
                        >
                          <span className="text-subtle fs-7">
                            {slot.dt_txt.split(" ")[1].slice(0, 5)}
                          </span>
                          <img
                            src={`https://openweathermap.org/img/wn/${slot.weather[0].icon}.png`}
                            alt="icona"
                            style={{ width: "35px" }}
                          />
                          <span className="fw-bold text-subtle">
                            {Math.round(slot.main.temp)}°C
                          </span>
                          <span className="text-accent fs-7 mt-1">
                            💧 {slot.main.humidity}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Collapse>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WeeklyForecast;
