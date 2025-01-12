import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [buses, setBuses] = useState([]);
    const [searched, setSearched] = useState(false); // Corrected the typo here

    const loadBuses = async () => {
        if (!selectedDate || !selectedSource || !selectedDestination) {
            alert("Please fill all fields!");
            return;
        }
        const dateString = `${selectedDate.getDate()} ${selectedDate.toLocaleString('default', { month: 'short' })} ${selectedDate.getFullYear()}`;
        const url = `/bus/?source=${selectedSource}&destination=${selectedDestination}&date=${dateString}`;
        const result = await axios.get(url);
        setBuses(result.data.b);
        setSearched(true);
    }

    return (
        <div className="container">
            <section className="text-center">
                <div className="p-5 bg-image" style={{ backgroundImage: 'url("https://mdbootstrap.com/img/new/textures/full/26.jpg")', height: '300px' }} />
                <div className="shadow-lg p-3 mb-5 bg-body rounded-3 card mx-4 mx-md-5" style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Book your tickets</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" onChange={(e) => setSelectedSource(e.target.value)} placeholder="Source" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" onChange={(e) => setSelectedDestination(e.target.value)} placeholder="Destination" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-outline mb-5">
                                        <DatePicker
                                            wrapperClassName="datePicker"
                                            className="form-control"
                                            selected={selectedDate}
                                            onChange={date => setSelectedDate(date)}
                                            dateFormat='dd/MM/yyyy'
                                            minDate={new Date()}
                                            placeholderText="Date"
                                            isClearable
                                        />
                                    </div>
                                    <button type="button" onClick={loadBuses} className="btn btn-primary btn-block mb-4">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {buses.length > 0 ? 
                <div className="shadow-lg bg-body rounded-3 card mt-5 mx-md-5">
                    <div className="card-body py-5 px-m-5">
                        <h2 className="text-center fw-bold">Results</h2>
                        <div className="card-body mx-md-5">
                            <table className="table">
                                <tbody>
                                    {buses.map((bus, index) => (
                                        <tr key={index}> {/* Add key for each row */}
                                            <td>{bus.name}</td>
                                            <td>
                                                <div>Source: {bus.source}</div>
                                                <div>Destination: {bus.destination}</div>
                                            </td>
                                            <td>
                                                <div>Fare: {bus.fare}</div>
                                                <div>Date: {bus.date}</div>
                                            </td>
                                            <td>
                                                <a className="btn btn-light" aria-current="page" href={`/bus/userDetails/${bus._id}`}>Book</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            : null}
            {searched && buses.length === 0 ? 
                <div className="shadow-lg mb-2 bg-body rounded-3 card mt-5 mx-md-5" style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                    <div className="card-body py-5 px-m-5">
                        <h2 className="text-center">Not Found</h2>
                        <p className="text-center">No bus available for this route or date.</p>
                    </div>
                </div> 
            : null}
        </div>
    );
}

export default Home;
