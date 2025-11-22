import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom"; // Keep Link for other sections if needed

function Home() {
    return (
        <main className={styles.home}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Best Pathology Services, Multispecialities for any type of Diagnostics
                    </h1>
                    {/* Removed the "Get Started" button */}
                    {/* <Link to="/Login" className={styles.heroButton}>
                        Get Started
                    </Link> */}
                </div>
                <img src="./home1.jpg" alt="Pathology Lab" className={styles.heroImage} />
            </section>

            {/* Most Opted Tests Section */}
            <section className={styles.testsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Most Opted Tests</h2>
                </div>
                <div className={styles.testGrid}>
                    <Link to="/ExploreTests" className={styles.testCard}>
                        <img src="./covid.png" alt="Covid Test" className={styles.testIcon} />
                        <p className={styles.testName}>Covid Test</p>
                    </Link>
                    <Link to="/ExploreTests" className={styles.testCard}>
                        <img src="./basic.png" alt="Basic Profile" className={styles.testIcon} />
                        <p className={styles.testName}>Basic Profile</p>
                    </Link>
                    <Link to="/ExploreTests" className={styles.testCard}>
                        <img src="./fullBodyScan.png" alt="Full Body Scan" className={styles.testIcon} />
                        <p className={styles.testName}>Full Body Scan</p>
                    </Link>
                    <Link to="/ExploreTests" className={styles.testCard}>
                        <img src="./miniScan.png" alt="Mini Scan" className={styles.testIcon} />
                        <p className={styles.testName}>Mini Scan</p>
                    </Link>
                    <Link to="/ExploreTests" className={styles.testCard}>
                        <img src="./cardio.png" alt="Cardio Test" className={styles.testIcon} />
                        <p className={styles.testName}>Cardio Test</p>
                    </Link>
                </div>
            </section>

            {/* Customer Feedback Section */}
            <section className={styles.feedbackSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Customer Feedback</h2>
                </div>
                <div className={styles.feedbackSlider}>
                    {/* The reviews will scroll horizontally on smaller screens */}
                    <div className={styles.feedbackCard}>
                        <p className={styles.reviewText}>
                            "Service is good, affordable pricing and timely report, overall experience is very good."
                        </p>
                        <p className={styles.reviewerName}>- Mr. Abhishek Shah</p>
                    </div>
                    <div className={styles.feedbackCard}>
                        <p className={styles.reviewText}>
                            "Great Experience, Best Quality Product and Best Facilities."
                        </p>
                        <p className={styles.reviewerName}>- Ms. Malini Roy</p>
                    </div>
                    <div className={styles.feedbackCard}>
                        <p className={styles.reviewText}>
                            "Well everything is fine, and I don’t think you need to change anything."
                        </p>
                        <p className={styles.reviewerName}>- Mr. Dev Gandhi</p>
                    </div>
                    <div className={styles.feedbackCard}>
                        <p className={styles.reviewText}>
                            "Service is good, affordable pricing and timely report, overall experience is very good."
                        </p>
                        <p className={styles.reviewerName}>- Mr. Abhishek Shah</p>
                    </div>
                </div>
                <Link to="/Feedback" className={styles.feedbackButton}>
                    Give Feedback
                </Link>
            </section>

            {/* Footer Section */}
            <footer className={styles.footerSection}>
                <div className={styles.footerLinks}>
                    <h3 className={styles.footerHeader}>Browse</h3>
                    <Link to="/AdminManagement" className={styles.footerLink}>Management</Link>
                    <Link to="/FAQPage" className={styles.footerLink}>FAQs</Link>
                </div>
                <div className={styles.contactInfo}>
                    <h3 className={styles.footerHeader}>Get in Touch</h3>
                    <p>Call us: 01234 56789</p>
                    <p>Mail us: biogenixLab@gmail.com</p>
                </div>
                <div className={styles.socialInfo}>
                    <h3 className={styles.footerHeader}>Follow us</h3>
                    <p>Facebook Instagram</p>
                </div>
            </footer>
        </main>
    );
}

export default Home;