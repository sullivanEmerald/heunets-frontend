import styles from './auth.module.css';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.header} >Login Page</h2>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input className={styles.input} type="email" id="username" name="email" required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input className={styles.input} type="password" id="password" name="password" required />
                </div>

                <button className={styles.button} type="submit">Login</button>
            </form>

            <p className={styles.footerText}>Don't have an account? <Link to="/auth/register" className={styles.link}>Register here</Link></p>
        </div>
    );
}

export default Login;