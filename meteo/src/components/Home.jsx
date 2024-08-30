import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
const Home = function () {
  const [singleCity, setSingleCity] = useState([]);
  useEffect(() => {
    myFetch();
  }, []);
  const myFetch = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Andria,IT&lang=it&appid=ba34375fd9bf4551c4c3de118b34ee40"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore!");
        }
      })
      .then((meteoObject) => {
        console.log("oggetto", meteoObject);
        setSingleCity([meteoObject]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        {singleCity.map((city) => {
          return (
            <Col key={city.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={city.weather[0].icon} />
                <Card.Body>
                  <Card.Title>{city.name}</Card.Title>
                  <Card.Text>
                    Temperatura minima{city.main.temp_min}, Temperatura massin
                    {city.main.temp_max}
                  </Card.Text>
                  <Card.Text></Card.Text>
                  <Card.Text>{city.weather[0].description}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Home;
