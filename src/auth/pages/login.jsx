import { useState } from 'react';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onHandleSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.email || !formData.password) {
            setError('All fields must be filled');
            setIsLoading(false);
            return;
        }

        try {
            const data = await authService.Login(formData);
            console.log(data)
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('fullName', data.fullName)
            localStorage.setItem('id', data.id)

            const dashboardPath =
                data.role === "contributor"
                    ? "/contributor/dashboard"
                    : "/volunteer/dashboard";

            setTimeout(() => {
                navigate(dashboardPath);
            }, 1000);

        } catch (error) {
            const resErr = error.response?.data?.message || 'Network error. Try again';
            setError(resErr);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Login Page</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={onHandleSubmitHandler}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={onChangeHandler}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input
                        className={styles.input}
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <button className={styles.button} disabled={isLoading} type="submit">
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
            </form>

            <p className={styles.footerText}>
                Don't have an account? <Link to="/auth/register" className={styles.link}>Register here</Link>
            </p>
        </div>
    );
};

export default Login;
