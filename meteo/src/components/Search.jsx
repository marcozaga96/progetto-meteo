import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query},IT&lang=it&appid=ba34375fd9bf4551c4c3de118b34ee40&units=metric&lang=it`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati!");
        }
      })
      .then((data) => {
        navigate(`/details/${data.id}`, { state: { city: data } });
        setCityData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setCityData(null);
      });
  };

  return (
    <div style={{ backgroundColor: "#221f1f" }}>
      <Container className="mt-4">
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="citySearch">
            <Form.Label className="text-light">Cerca una città</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il nome della città"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Cerca
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Search;
