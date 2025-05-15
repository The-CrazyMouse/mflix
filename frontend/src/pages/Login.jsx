import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/search');
        } else {
            const error = await response.json();
            setErrorMessage(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>mflix</h1>
            <form onSubmit={handleSubmit}>
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

                <button type="submit" className={styles.button}>Login</button>
            </form>

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            <p className={styles.registerLink}>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
}

export default Login;

