import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const ContactPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
  const response = await fetch(
  import.meta.env.VITE_CONTACT_DATABASE_URL,
  {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  }
);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Contact details submitted successfully!");

      setUser({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Card className="p-4">
        <h2 className="text-center mb-4">Contact Us</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={user.name}
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>

            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              value={user.phone}
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Button type="submit" variant="dark">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ContactPage;