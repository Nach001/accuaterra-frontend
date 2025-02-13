import InputCustomComponent from '../../components/inputCustomComponent';
import ButtonComponent from '../../components/ButtonComponent';
import imgLogo from '../../assets/imgAcuaterra.jpeg';
import '../../Styles/Styles.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const [errors, setErrors] = useState({
      username: '',
      email: '',
      password: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Función para validar un campo específico
    const validateField = (field, value) => {
      let error = '';
  
      switch (field) {
        case 'username':
          if (!value) {
            error = 'Username is required';
          }
          break;
        case 'email':
          if (!value) {
            error = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            error = 'Email is invalid';
          }
          break;
        case 'password':
          if (!value) {
            error = 'Password is required';
          }
          break;
        default:
          break;
      }
  
      setErrors({
        ...errors,
        [field]: error,
      });
    };

    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      validateField(name, value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { username, email, password } = formData;

      // Validar todos los campos antes de enviar
      validateField('username', username);
      validateField('email', email);
      validateField('password', password);

      // Si hay errores, no enviar el formulario
      if (errors.username || errors.email || errors.password || !username || !email || !password) {
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/v1/employee/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
          }),
        });

        if (response.status === 200) {
          setIsModalOpen(true);
        } else {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
        // Manejar la respuesta exitosa aquí (por ejemplo, redirigir al usuario)
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error aquí (por ejemplo, mostrar un mensaje de error)
      }
      
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
      navigate('/');
    };

    const handleRegisterRedirect = () => {
      navigate('/');
    };
    return (
      <div className="register-container">
        <img src={imgLogo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <InputCustomComponent
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            error={errors.username}
            type={"text"}
          />
          <InputCustomComponent
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            error={errors.email}
            type={"email"}
          />
          <InputCustomComponent
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            error={errors.password}
            type={"password"}
          />
          <ButtonComponent type="submit" text="Register" />
          <ButtonComponent onClick={handleRegisterRedirect} text="Iniciar Sesion" />
        </form>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Registro Exitoso</h2>
              <p>El registro fue exitoso.</p>
              <button onClick={handleModalClose}>Aceptar</button>
            </div>
          </div>
        )}
      </div>
    );
}

export default Register;