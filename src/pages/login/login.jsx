import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonComponent from '../../components/ButtonComponent';
import imgLogo from '../../assets/imgAcuaterra.jpeg';
import '../../Styles/Styles.css';
import '../../Styles/login.css';
import InputCustomComponent from '../../components/inputCustomComponent';

export default function Login() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://backmejorado.onrender.com/api/users/loginMVC', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('jwtToken', data.token); // Guarda el token en el almacenamiento local
                setIsLoggedIn(true);
                navigate('/users'); // Navega a la página de usuarios
            }
        } catch (error) {
            setErrors({
                ...errors,
                email: 'invalid credentials',
            });
            console.error('Login failed', error);
        }
    };

    return (
        <div className="login-container">
            <img src={imgLogo} alt="Logo" />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <InputCustomComponent
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <InputCustomComponent
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <ButtonComponent type="submit">Login</ButtonComponent>
            </form>
        </div>
    );
}