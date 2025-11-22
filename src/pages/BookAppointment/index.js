//Frontend for Booking appointment
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Ensure this CSS is imported
import axios from "axios";

function BookAppointment() {
    const [date, setDate] = useState(new Date());
    const [tests, setTests] = useState([]); // Renamed 'test' to 'tests' for clarity (array of all tests)
    const [formData, setFormData] = useState({
        doorToDoor: "no",
        email: "",
        name: "",
        selectedTestName: "", // To store the name of the selected test
        price: "",           // To store the price of the selected test
        streetAddress: "",
        roadNo: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [fetchError, setFetchError] = useState(""); // State for fetching tests error
    const [submitError, setSubmitError] = useState(""); // State for form submission error
    const [submitSuccess, setSubmitSuccess] = useState(""); // State for form submission success

    // Handler for calendar date change
    const onCalendarChange = (newDate) => {
        setDate(newDate);
    };

    // Function to fetch tests from the backend
    const fetchTests = async () => {
        try {
            // UPDATED: Changed URL to the new public GET route for tests
            const url = "http://localhost:5000/api/tests/public/getTests";
            // UPDATED: Changed to axios.get() as it's now a GET request
            const response = await axios.get(url);
            setTests(response.data);
            setFetchError("");
        } catch (error) {
            console.error("Error fetching tests:", error);
            setFetchError("Failed to load tests. Please try again later.");
        }
    };

    // useEffect to fetch tests when the component mounts
    useEffect(() => {
        fetchTests();
    }, []); // Empty dependency array means this runs once on mount

    // Handler for all form input changes (except test selection)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handler for test selection dropdown
    const handleTestSelectChange = (event) => {
        const selectedTestName = event.target.value;
        const selectedTest = tests.find((t) => t.name === selectedTestName);

        setFormData((prevState) => ({
            ...prevState,
            selectedTestName: selectedTestName,
            price: selectedTest ? selectedTest.price : "", // Set price, or empty if no test selected
        }));
    };

    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError(""); // Clear previous errors
        setSubmitSuccess(""); // Clear previous success messages

        // Basic validation (can be expanded)
        if (!formData.name || !formData.email || !formData.selectedTestName || !date) {
            setSubmitError("Please fill in all required fields.");
            return;
        }

        let address = `${formData.streetAddress}, ${formData.roadNo}, ${formData.city}, ${formData.pincode}, ${formData.state}`;
        let sendData = {
            address: address,
            name: formData.name,
            email: formData.email,
            date: date, // Date object
            dtd: formData.doorToDoor,
            test: formData.selectedTestName, // Send the selected test name
            price: formData.price // Send the price
        };

        try {
            const url = "http://localhost:5000/api/appointment/bookAppointment";
            const response = await axios.post(url, sendData);

            setSubmitSuccess(response.data.message || "Appointment booked successfully!");
            // Optionally clear form here: setFormData({...initialState});

            // Redirect to payment after a short delay
            setTimeout(() => {
                window.location = "/payment";
            }, 1500); // Redirect after 1.5 seconds

        } catch (error) {
            console.error("Appointment booking error:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setSubmitError(error.response.data.error);
            } else {
                setSubmitError("Failed to book appointment. Please try again.");
            }
        }
    };

    return (
        <div className={styles.appointmentPage}>
            <h1 className={styles.pageTitle}>Book Appointment</h1>
            <p className={styles.pageSubtitle}>Let’s see when you can get tested!!</p>

            <div className={styles.mainContent}>
                {/* Calendar Section */}
                <div className={styles.calendarSection}>
                    <Calendar onChange={onCalendarChange} value={date} />
                    <div className={styles.calendarLegend}>
                        <div className={styles.legendItem + ' ' + styles.booked}>
                            <span className={styles.legendMarker}></span> Booked
                        </div>
                        <div className={styles.legendItem + ' ' + styles.available}>
                            <span className={styles.legendMarker}></span> Available
                        </div>
                        <div className={styles.legendItem + ' ' + styles.holiday}>
                            <span className={styles.legendMarker}></span> Holiday
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className={styles.formSection}>
                    <h3>Appointment Details</h3>
                    <form onSubmit={handleSubmit}>
                        {/* Door-to-door service radio buttons */}
                        <div className={styles.formGroup}>
                            <label>Want door-to-door service?</label>
                            <div className={styles.radioGroup}>
                                <label htmlFor="yes" className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        id="yes"
                                        name="doorToDoor"
                                        value="yes"
                                        checked={formData.doorToDoor === "yes"}
                                        onChange={handleInputChange}
                                    />
                                    Yes
                                </label>
                                <label htmlFor="no" className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        id="no"
                                        name="doorToDoor"
                                        value="no"
                                        checked={formData.doorToDoor === "no"}
                                        onChange={handleInputChange}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* Your Name */}
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Your name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Your Email */}
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Your email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Select Test Dropdown */}
                        <div className={styles.formGroup}>
                            <label htmlFor="test">Select Test:</label>
                            <select
                                name="selectedTestName" // Use selectedTestName to match state
                                id="test"
                                value={formData.selectedTestName}
                                onChange={handleTestSelectChange} // Use specific handler for test
                                required
                            >
                                <option value="">-- Select a Test --</option>
                                {fetchError && <option disabled>{fetchError}</option>}
                                {tests.length > 0 ? (
                                    tests.map((t) => (
                                        <option key={t._id} value={t.name}>
                                            {t.name}
                                        </option>
                                    ))
                                ) : (
                                    !fetchError && <option disabled>Loading tests...</option>
                                )}
                            </select>
                        </div>

                        {/* Price Display */}
                        <div className={styles.formGroup}>
                            <label htmlFor="price">Price:</label>
                            <div className={styles.priceDisplay}>
                                Rs. {formData.price || "N/A"}
                            </div>
                        </div>

                        {/* Address Fields */}
                        <div className={styles.formGroup}>
                            <label htmlFor="streetAddress">Street Address:</label>
                            <input
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="roadNo">Apt. no., Road name:</label>
                            <input
                                type="text"
                                id="roadNo"
                                name="roadNo"
                                value={formData.roadNo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="state">State:</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="pincode">Pincode:</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Submission Messages */}
                        {submitSuccess && <div className={styles.successMessage}>{submitSuccess}</div>}
                        {submitError && <div className={styles.errorMessage}>{submitError}</div>}

                        {/* Book Appointment Button */}
                        <button type="submit" className={styles.submitButton}>
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>

            {/* Link back to home */}
            <Link to="/" className={styles.backLink}>Go back to home</Link>
        </div>
    );
}

export default BookAppointment;