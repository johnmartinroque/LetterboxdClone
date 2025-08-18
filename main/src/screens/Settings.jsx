import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProfileAuth from "../components/authentication/ProfileAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileSettings from "../components/settings/ProfileSettings";
import Avatar from "../components/settings/Avatar";
import Auth from "../components/settings/Auth";

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
            <Tab eventKey="profile" title="Profile">
              <ProfileSettings />
            </Tab>
            <Tab eventKey="auth" title="Auth">
              <Auth />
            </Tab>
            <Tab eventKey="avatar" title="Avatar">
              <Avatar />
            </Tab>
          </Tabs>
        </Row>
      </Container>
      <ProfileAuth />
    </div>
  );
}

export default Settings;
