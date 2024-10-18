import React, { useState } from "react";

const Contact = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // You can add your form submission logic here, like sending data to an API
        console.log({ message, email, mobile });
    };

    return (
        <div className="container">
            <section className="text-center">
                <div
                    className="p-5 bg-image"
                    style={{
                        backgroundImage: 'url("https://mdbootstrap.com/img/new/textures/full/3.jpg")',
                        height: '300px',
                    }}
                />
                <div
                    className="shadow-lg p-3 mb-5 bg-body rounded-3 card mx-4 mx-md-5"
                    style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}
                >
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Contact Us</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <textarea
                                            className="form-control"
                                            placeholder="Tell us about..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-outline mb-5">
                                        <input
                                            type="text"
                                            placeholder="Mobile No"
                                            className="form-control"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
