import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SingleMeteo = function ({ cityMeteo }) {
  const [singleCity, setSingleCity] = useState([]);
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    myFetch();
  }, [cityMeteo]);
  const myFetch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityMeteo},IT&lang=it&appid=ba34375fd9bf4551c4c3de118b34ee40&units=metric&lang=it`
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
        setIcon(
          "http://openweathermap.org/img/w/" +
            meteoObject.weather[0].icon +
            ".png"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDetailsClick = (city) => {
    navigate(`/details/${city.id}`, { state: { city } });
  };

  return (
    <Container>
      <Row>
        {singleCity.map((city) => {
          return (
            <Col key={city.id} className="mt-4">
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={icon} className="w-50" />
                <Card.Body>
                  <Card.Title>{city.name}</Card.Title>
                  <Card.Text>
                    Min.{city.main.temp_min}, Max.
                    {city.main.temp_max}
                  </Card.Text>
                  <Card.Text></Card.Text>
                  <Card.Text>{city.weather[0].description}</Card.Text>
                  <Button
                    variant="dark"
                    onClick={() => handleDetailsClick(city)}
                  >
                    Dettagli
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default SingleMeteo;
