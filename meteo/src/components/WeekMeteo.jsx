import { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";

const WeekMeteo = function ({ cityMeteo }) {
  const [detCity, setdetCity] = useState([]);

  const [icon, setIcon] = useState("");

  useEffect(() => {
    myFetch();
  }, [cityMeteo]);
  const myFetch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityMeteo},it&appid=ba34375fd9bf4551c4c3de118b34ee40&units=metric&lang=it`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore!");
        }
      })
      .then((meteoObject) => {
        console.log("oggetto", meteoObject.list);
        setdetCity(meteoObject.list);
        setIcon(
          "http://openweathermap.org/img/w/" +
            meteoObject[0].weather[0].icon +
            ".png"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("dtcity", detCity);
  return (
    <Row>
      {detCity.map((our, index) => (
        <Col className="mt-4">
          <Card
            style={{ width: "10rem", backgroundColor: "#bcd9ff" }}
            key={index}
          >
            <Card.Img
              style={{ width: "40%" }}
              variant="top"
              src={`http://openweathermap.org/img/wn/${our.weather[0].icon}@2x.png`}
            />
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                {our.main.temp}°C
              </Card.Title>
              <Card.Text>Meteo orario {our.dt_txt}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default WeekMeteo;
