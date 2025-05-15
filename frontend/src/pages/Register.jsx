import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const responseData = await response.json();

        if (response.ok) {
            alert('User registered successfully!');
            navigate('/login');
        } else {
            setErrorMessage(responseData.message || 'An error occurred');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>mflix</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className={styles.formLabel}>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                />

                <label htmlFor="email" className={styles.formLabel}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                />

                <label htmlFor="password" className={styles.formLabel}>Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />

                <button type="submit" className={styles.button}>Register</button>
            </form>

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            <p className={styles.loginLink}>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}

export default Register;

