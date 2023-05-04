import Footer from "components/Footer";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="container mt-5">
      <h1>Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Form.Group>
        <Button className="m-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Footer />
    </div>
  );
}

export default ContactUs;
