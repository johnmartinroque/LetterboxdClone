import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FourFavoriteFilms from "../components/film/FourFavoriteFilms";
import ProfileAuth from "../components/authentication/ProfileAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileSettings from "../components/settings/ProfileSettings";

function Settings() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>Account Settings</h1>
          </Col>
        </Row>
        <Row>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              <ProfileSettings />
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Auth
            </Tab>
            <Tab eventKey="contact" title="Contact">
              Tab content for Contact
            </Tab>
          </Tabs>
        </Row>
      </Container>
      <ProfileAuth />
    </div>
  );
}

export default Settings;
