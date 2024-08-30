import { useLocation } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import WeekMeteo from "./WeekMeteo";

const MeteoDetails = () => {
  const location = useLocation();
  const { city } = location.state;

  return (
    <div className="p-4 h-100" style={{ backgroundColor: "#221f1f" }}>
      <Container className="mt-4">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            className="w-50"
            variant="top"
            src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          />
          <Card.Body>
            <Card.Title>{city.name}</Card.Title>
            <Card.Text>
              Lon.{city.coord.lon}, Lat.{city.coord.lat}
            </Card.Text>
            <Card.Text>
              Min. {city.main.temp_min}°C, Max. {city.main.temp_max}°C
            </Card.Text>
            <Card.Text>Pressione: {city.main.pressure}</Card.Text>
            <Card.Text>Pressione: {city.main.humidity}</Card.Text>
            <Card.Text>{city.weather[0].description}</Card.Text>
            <Button variant="dark" onClick={() => window.history.back()}>
              Torna alla home
            </Button>
          </Card.Body>
        </Card>
        <WeekMeteo />
      </Container>
    </div>
  );
};

export default MeteoDetails;
