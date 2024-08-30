import { useState } from "react";
import SingleMeteo from "./SingleMeteo";
import { Col, Container, Row } from "react-bootstrap";

const AllMeteo = () => {
  const [primoMeteo, setFirstMeteo] = useState("Andria");
  const [secondoMeteo, setSecondoMeteo] = useState("Bari");
  const [terzoMeteo, setterzoMeteo] = useState("Milano");
  const [quartoMeteo, setquartoMeteo] = useState("Taranto");
  const [quintoMeteo, setQuintoMeteo] = useState("Roma");
  const [sestoMeteo, setSestoMeteo] = useState("Napoli");

  return (
    <div className="px-4" style={{ backgroundColor: "#221f1f" }}>
      <Container>
        <Row xs={1} md={2} lg={3} className="p-4">
          <Col>
            <SingleMeteo cityMeteo={primoMeteo} />
          </Col>
          <Col>
            <SingleMeteo cityMeteo={secondoMeteo} />
          </Col>
          <Col>
            <SingleMeteo cityMeteo={terzoMeteo} />
          </Col>
          <Col>
            <SingleMeteo cityMeteo={quartoMeteo} />
          </Col>
          <Col>
            <SingleMeteo cityMeteo={quintoMeteo} />
          </Col>
          <Col>
            <SingleMeteo cityMeteo={sestoMeteo} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllMeteo;
