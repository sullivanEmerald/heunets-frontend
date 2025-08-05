import styles from '../Dashboard.module.css'
import { ContributorService } from '../../services/contributor';
import { useState } from 'react';
import { useAuth } from '../../hooks/use.auth';
import { useNavigate } from 'react-router-dom';

const ContributorsDashBoard = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: ""
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
        setIsSubmitted(false)
        setError('');

        if (!formData.title || !formData.description) {
            setError('All fields must be filled');
            setIsLoading(false);
            return;
        }

        try {
            await ContributorService.PostTasks(formData);
            setIsSubmitted(true)
        } catch (error) {
            const resErr = error.response?.data?.message || 'Network error. Try again';
            setError(resErr);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <button onClick={() => {
                navigate('/contributor/my-posted-tasks')
            }} style={{ backgroundColor: '#152a4b', borderRadius: '9999px', color: '#fff', fontSize: '20px', padding: '15px', cursor: 'pointer' }}>View My Tasks</button>
            <div className={styles.container}>
                <h2 className={styles.header}>Welcome back,  {user.fullName}</h2>
                <p className={styles.p}>Create Your Posts </p>
                <span className={styles.span}>{isSubmitted ? 'Your Post have been Created' : ""}</span>
                {error && <p className={styles.error}>{error}</p>}
                <form className={styles.form} onSubmit={onHandleSubmitHandler}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input
                            className={styles.input}
                            type="title"
                            id="title"
                            name="title"
                            required
                            value={formData.title}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <button className={styles.button} disabled={isLoading} type="submit">
                        {isLoading ? 'Posting...' : 'Create'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ContributorsDashBoard;