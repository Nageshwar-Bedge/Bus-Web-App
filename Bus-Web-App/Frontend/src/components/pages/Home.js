import React, { useState } from "react";
import axios from "axios";
import { Spinner, Alert, Button, Table, Modal, Form } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";

const AvailableBuses = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [totalFare, setTotalFare] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/bus`, {
        params: { source, destination, date },
      });

      if (response.data.buses && response.data.buses.length > 0) {
        setBuses(response.data.buses);
        setMessage("");
      } else {
        setBuses([]);
        setMessage("No buses found with the given criteria.");
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
      setMessage("Error fetching buses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (bus) => {
    setBookingDetails(bus);
    setShowModal(true);
    setBookingSuccess(false);
    setShowQR(false);
    setTotalFare(0);  // Reset fare
  };

  const handlePassengerCountChange = (e) => {
    const noOfPassengers = e.target.value;
    setTotalFare(noOfPassengers * bookingDetails.fair);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const passengerDetails = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        gender: formData.get("gender"),
        noOfPassengers: formData.get("noOfPassengers"),
        busId: bookingDetails._id,
        total: totalFare,
      };

      // Simulating successful payment
      setShowQR(true);
      setTimeout(async () => {
        await axios.post(`/passenger`, passengerDetails); // API call to save booking details
        setBookingSuccess(true);
        setBookingInfo({
          ...passengerDetails,
          busName: bookingDetails.name,
          source: bookingDetails.source,
          destination: bookingDetails.destination,
          date: bookingDetails.date,
        });
        setShowQR(false);
      }, 5000); // Simulated QR scanning time
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("Failed to book the ticket. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-dark">Search Available Buses</h2>

      {/* Search Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{
              borderColor: "black",
              borderWidth: "2px",
              borderRadius: "5px",
            }}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              borderColor: "black",
              borderWidth: "2px",
              borderRadius: "5px",
            }}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              borderColor: "black",
              borderWidth: "2px",
              borderRadius: "5px",
            }}
          />
        </div>
        <div className="col-md-3">
          <Button
            variant="primary"
            onClick={fetchBuses}
            disabled={loading}
            block
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
            }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Search"}
          </Button>
        </div>
      </div>

      {/* Existing Message */}
      {message && <Alert variant="danger">{message}</Alert>}

      {/* Display Bus Results */}
      {buses.length > 0 && (
        <Table responsive striped bordered hover className="mt-4">
          <thead className="bg-info text-white">
            <tr>
              <th>Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Fare</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.name}</td>
                <td>{bus.source}</td>
                <td>{bus.destination}</td>
                <td>{bus.fair}</td>
                <td>{bus.date}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleBooking(bus)}
                  >
                    Book Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {bookingSuccess
              ? "🎉 Ticket Successfully Booked! 🎉"
              : `Book Ticket for ${bookingDetails?.name || "Selected Bus"}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showQR ? (
            <div className="text-center">
              <h5 className="text-success">Scan the QR Code to Complete Payment</h5>
              <QRCodeCanvas value={`Pay ₹${totalFare}`} />
              <h6 className="mt-4">
                Your ticket reservation is almost complete! Please scan the QR code and complete the payment to confirm your booking.
              </h6>
            </div>
          ) : bookingSuccess ? (
            <div className="text-center">
              <h5 className="text-success">🎉 Ticket Successfully Booked! 🎉</h5>
              <p>Here are your booking details:</p>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Bus Name</td>
                    <td>{bookingInfo.busName}</td>
                  </tr>
                  <tr>
                    <td>Source</td>
                    <td>{bookingInfo.source}</td>
                  </tr>
                  <tr>
                    <td>Destination</td>
                    <td>{bookingInfo.destination}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{bookingInfo.date}</td>
                  </tr>
                  <tr>
                    <td>Number of Passengers</td>
                    <td>{bookingInfo.noOfPassengers}</td>
                  </tr>
                  <tr>
                    <td>Total Fare</td>
                    <td>₹{bookingInfo.total}</td>
                  </tr>
                  <tr>
                    <td>Passenger Name</td>
                    <td>
                      {bookingInfo.firstName} {bookingInfo.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{bookingInfo.email}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{bookingInfo.gender}</td>
                  </tr>
                </tbody>
              </Table>
              <p>Thank you for booking with us! Have a safe journey! 🚌</p>
            </div>
          ) : (
            <Form onSubmit={handleConfirmBooking}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" name="gender" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Passengers</Form.Label>
                <Form.Control
                  type="number"
                  name="noOfPassengers"
                  placeholder="Enter number of passengers"
                  required
                  min="1"
                  onChange={handlePassengerCountChange}
                />
                <Form.Text className="text-muted">
                  Fare per passenger: ₹{bookingDetails?.fair || "0"}
                </Form.Text>
              </Form.Group>
              {totalFare > 0 && (
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#4caf50",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  Total Fare: ₹{totalFare}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button variant="primary" type="submit" style={{ width: "200px" }}>
                  Confirm Booking
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AvailableBuses;
