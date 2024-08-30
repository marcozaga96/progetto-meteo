import { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        setdetCity([meteoObject]);
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

  return (
    <Container>
      <Row>
        {detCity.map((city) => {
          return (
            <Col className="mt-4">
              <ListGroup>
                <ListGroup.Item>Giorno{city.list[0].dt_txt}</ListGroup.Item>
              </ListGroup>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default WeekMeteo;
