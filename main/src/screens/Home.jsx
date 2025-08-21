import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import landingPagePic from "../images/bg.jpg";

function Home() {
  return (
    <div>
      <Container>
        <h1>martin branch</h1>
        <Row>
          <Col className="position-relative p-0">
            <Image
              src={landingPagePic}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                WebkitMaskImage: `
                  linear-gradient(to top,    transparent 0%, black 90%, black 100%, transparent 100%),
                  linear-gradient(to bottom, transparent 0%, black 0%, black 80%, transparent 100%),
                  linear-gradient(to left,   transparent 0%, black 40%, black 80%, transparent 100%),
                  linear-gradient(to right,  transparent 0%, black 40%, black 80%, transparent 100%)`,
                WebkitMaskComposite: "intersect",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
              }}
            />
            <h2
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontSize: "3rem",
                padding: "10px 20px",
                borderRadius: "8px",
                maxWidth: "90%",
                textAlign: "center",
              }}
            >
              Track films you’ve watched. Save those you want to see. Tell your
              friends what’s good.
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button>Get started - it's free</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
