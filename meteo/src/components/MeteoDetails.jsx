import { Link, useLocation } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import WeekMeteo from "./WeekMeteo";
import {
  Thermometer,
  Wind,
  Droplet,
  ThermometerSun,
  BarChartSteps,
} from "react-bootstrap-icons";

const MeteoDetails = () => {
  const location = useLocation();
  const { city } = location.state;

  return (
    <>
      <div className="p-4 " style={{ backgroundColor: "#1A3762" }}>
        <Row>
          <Col md={12}>
            <Card style={{ backgroundColor: "#bcd9ff" }}>
              <Row>
                <Col md={3} className="d-flex justify-content-center">
                  <Card.Img
                    className="w-50"
                    variant="top"
                    src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  />
                </Col>
                <Col md={5} className="mt-4">
                  <Card.Title style={{ fontWeight: "bold", fontSize: "3rem" }}>
                    {city.name}
                  </Card.Title>
                  <Card.Text style={{ fontWeight: "bold", fontSize: "1.7rem" }}>
                    {city.main.temp}°C
                  </Card.Text>
                </Col>
              </Row>
              <Card.Body>
                <Row>
                  <Col
                    md={2}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                    }}
                  >
                    <Row>
                      <Col md={1}>
                        <Thermometer />
                      </Col>
                      <Col md={11}>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            Temperatura minima
                          </Card.Text>
                        </Row>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.4rem" }}
                          >
                            {city.main.temp_min}°C
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    md={2}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                    }}
                  >
                    <Row>
                      <Col md={1}>
                        <Thermometer />
                      </Col>
                      <Col md={11}>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            Temperatura Massima
                          </Card.Text>
                        </Row>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.4rem" }}
                          >
                            {city.main.temp_max}°C
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    md={2}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                    }}
                  >
                    <Row>
                      <Col md={1}>
                        <Wind />
                      </Col>
                      <Col md={11}>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            Vento
                          </Card.Text>
                        </Row>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.4rem" }}
                          >
                            {city.wind.speed} km/h
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    md={2}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                    }}
                  >
                    <Row>
                      <Col md={1}>
                        <BarChartSteps />
                      </Col>
                      <Col md={11}>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            Pressione
                          </Card.Text>
                        </Row>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.4rem" }}
                          >
                            {city.main.pressure} Ph
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    md={2}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                    }}
                  >
                    <Row>
                      <Col md={1}>
                        <Droplet />
                      </Col>
                      <Col md={11}>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            Umidità
                          </Card.Text>
                        </Row>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.4rem" }}
                          >
                            {city.main.humidity}%
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    md={2}
                    style={{
                      padding: "5px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                    }}
                  >
                    <Row>
                      <Col md={1}>
                        <ThermometerSun />
                      </Col>
                      <Col md={11}>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                          >
                            Tipologia Tempo
                          </Card.Text>
                        </Row>
                        <Row>
                          <Card.Text
                            style={{ fontWeight: "bold", fontSize: "1.4rem" }}
                          >
                            {city.weather[0].description}
                          </Card.Text>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body className="d-flex justify-content-around">
                <Link to={"/"}>
                  <Button variant="dark">Torna alla home</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <WeekMeteo cityMeteo={city.name} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MeteoDetails;
