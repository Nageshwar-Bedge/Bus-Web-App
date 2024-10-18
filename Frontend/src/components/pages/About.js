import React from "react";

const About = () => {
  const containerStyle = {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "20px auto",
    maxWidth: "800px",
  };

  const titleStyle = {
    color: "#003366",
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
  };

  const leadStyle = {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "15px",
    color: "#333333",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>About Us</h1>
      <p style={leadStyle}>
        Welcome to our bus ticket booking system! We believe that convenience
        and flexibility are key, which is why we allow you to easily browse and
        book tickets for your preferred routes. No matter how big or small your
        journey is, we ensure a smooth and hassle-free booking experience. Our
        system is designed to handle all your travel needs, from selecting the
        right seat to securing the best prices.
      </p>

      <p style={leadStyle}>
        Customer satisfaction is our top priority, and we promise to protect
        your data while making your travel arrangements as seamless as possible.
        Every step of the booking process is handled with precision and care,
        ensuring that you can focus on your journey, not the logistics.
      </p>

      <p style={leadStyle}>
        Sometimes, a trip may be spontaneous, or other times it’s carefully
        planned. Whatever your situation, we’re here to help with a system
        that’s both easy to use and reliable. Let us take care of the details,
        while you enjoy the freedom of exploring new destinations.
      </p>
    </div>
  );
};

export default About;
