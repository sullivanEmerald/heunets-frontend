import styles from "./auth.module.css";
import { useState } from "react";
import { authService } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwoerds do not match. Please try again.");
            return;
        }

        try {
            await authService.Register(formData);
            navigate('/auth/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Register Page</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="fullname" className={styles.label}>Fullname</label>
                    <input
                        className={styles.input}
                        name="fullname"
                        type="text"
                        placeholder="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input
                        className={styles.input}
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={handleChange}
                        value={formData.password}
                    />

                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
                    <input
                        className={styles.input}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />
                </div>
                <button className={styles.button} disabled={isLoading} type="submit">
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    )
}

export default Register;