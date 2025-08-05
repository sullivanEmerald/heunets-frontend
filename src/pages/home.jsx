import styles from "./Index.module.css";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <main className={styles.container}>
            <h1 style={{ color: '#152a4b' }}>Community Work Board</h1>
            <Link to='/auth/login' className={styles.button}>Get Started</Link>
        </main>
    )
}

export default Home;