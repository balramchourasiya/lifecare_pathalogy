//Admin Side Page
import styles from "./styles.module.css";

const AdminManagement = ()=>{
    return(
        <div className={styles.adminPageContainer}> {/* Added new container class */}
            <div className={styles.mainContentWrapper}> {/* Added new wrapper for flex layout */}
                <section className={styles.containerLeft}>
                    <img src="./Admin.jpg" alt="Admin" /> {/* Changed alt text for better accessibility */}
                </section>
                <section className={styles.containerRight}>
                    <div className={styles.block}>
                        <h1 style={{ textAlign: "center" }}>Hello, Admin!!!</h1>
                        <a href="/editTest"><button type='button' className={styles.btn1}>Manage Test Packages</button></a>
                    </div>
                </section>
            </div>
        </div>
    );
}
export  default  AdminManagement;