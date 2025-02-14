
// import React, { useState, useEffect } from 'react';
// import '../../Styles/Styles.css';
// import InputCustomComponent from '../../components/inputCustomComponent';
// import { useNavigate } from 'react-router-dom';

// const UsersTable = () => {
//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const [errorModalOpen, setErrorModalOpen] = useState(false); // Estado para el modal de error
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     nombre: '',
//     email: '',
//     password: '',
//     n_documento_identidad: '',
//     sede: '',
//     n_ficha: '',
//     jornada: '',
//     nombre_del_programa: ''
//   });

//   const [errors, setErrors] = useState({});

//   const validateField = (field, value) => {
//     let error = '';
//     switch (field) {
//       case 'email':
//         if (!value) {
//           error = 'El correo es obligatorio';
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           error = 'El correo no es válido';
//         }
//         break;
//       case 'password':
//         if (!value) {
//           error = 'La contraseña es obligatoria';
//         } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
//           error = 'La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial';
//         }
//         break;
//       case 'nombre':
//       case 'sede':
//       case 'jornada':
//       case 'nombre_del_programa':
//         if (!/^[A-Za-z\s]+$/.test(value)) {
//           error = 'Este campo solo debe contener letras';
//         }
//         break;
//       case 'n_documento_identidad':
//       case 'n_ficha':
//         if (!/^[0-9]+$/.test(value)) {
//           error = 'Este campo solo debe contener números';
//         }
//         break;
//       default:
//         break;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
//   };

//   const fetchUsers = async () => {
//     const token = localStorage.getItem('jwtToken');
//     try {
//       const response = await fetch('http://localhost:3001/api/users/usuarios', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     validateField(name, value);
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('jwtToken');

//     Object.keys(formData).forEach((field) => validateField(field, formData[field]));
//     if (Object.values(errors).some((error) => error)) {
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         await fetchUsers();
//         setIsModalOpen(false);
//         setSuccessModalOpen(true);
//         setFormData({ // Limpiar los campos
//           nombre: '',
//           email: '',
//           password: '',
//           n_documento_identidad: '',
//           sede: '',
//           n_ficha: '',
//           jornada: '',
//           nombre_del_programa: ''
//         });
//       } else {
//         setErrorModalOpen(true); // Mostrar modal de error
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setErrorModalOpen(true); // Mostrar modal de error si hay un fallo
//     }
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseSuccessModal = () => {
//     setSuccessModalOpen(false);
//   };

//   const handleCloseErrorModal = () => {
//     setErrorModalOpen(false);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('jwtToken');
//     navigate('/');
//   };

//   return (
//     <div className="container">
//       <h1>Lista de Usuarios</h1>
//       <div className="clsBotones">
//         <button className='clsBtnRegistrar' onClick={handleOpenModal}>Registrar Usuario</button>
//         <button className='clsBtnSalir' onClick={handleLogout}>Salir</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Email</th>
//             <th>Documento</th>
//             <th>Sede</th>
//             <th>Ficha</th>
//             <th>Jornada</th>
//             <th>Programa</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id_usuario}>
//               <td>{user.id_usuario}</td>
//               <td>{user.nombre}</td>
//               <td>{user.email}</td>
//               <td>{user.n_documento_identidad}</td>
//               <td>{user.sede}</td>
//               <td>{user.n_ficha}</td>
//               <td>{user.jornada}</td>
//               <td>{user.nombre_del_programa}</td>
//               <td>
//                 <button className='clsBtnEB'>Editar</button>
//                 <button className='clsBtnEB'>Borrar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Registrar Usuario</h2>
//             <form onSubmit={handleRegister}>
//               {Object.keys(formData).map((field) => (
//                 <div key={field}>
//                   <label>{field.replace(/_/g, ' ').toUpperCase()}:</label>
//                   <InputCustomComponent
//                     type={field === 'email' ? 'email' : 'text'}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleInputChange}
//                     required
//                     error={errors[field]}
//                   />
//                 </div>
//               ))}
//               <button type="submit">Registrar</button>
//               <button type="button" onClick={handleCloseModal}>
//                 Cancelar
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {successModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>¡Registro Exitoso!</h2>
//             <p>El usuario se registró correctamente.</p>
//             <button onClick={handleCloseSuccessModal}>Cerrar</button>
//           </div>
//         </div>
//       )}

//       {errorModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Error en el Registro</h2>
//             <p>No se pudo registrar el usuario. Por favor, inténtelo de nuevo.</p>
//             <button onClick={handleCloseErrorModal}>Cerrar</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersTable;


import React, { useState, useEffect } from 'react';
import '../../Styles/Styles.css';
import '../../Styles/users.css';
import '../../Styles/modal.css';
import InputCustomComponent from '../../components/inputCustomComponent';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false); // Estado para el modal de error
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    n_documento_identidad: '',
    sede: '',
    rol: '', // Nuevo campo
    n_ficha: '',
    jornada: '',
    nombre_del_programa: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'email':
        if (!value) {
          error = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'El correo no es válido';
        }
        break;
      case 'password':
        if (!value) {
          error = 'La contraseña es obligatoria';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
          error = 'La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial';
        }
        break;
      case 'nombre':
      case 'sede':
      case 'jornada':
      case 'nombre_del_programa':
      case 'rol': // Validación para el nuevo campo
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Este campo solo debe contener letras';
        }
        break;
      case 'n_documento_identidad':
      case 'n_ficha':
        if (!/^[0-9]+$/.test(value)) {
          error = 'Este campo solo debe contener números';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/usuarios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    Object.keys(formData).forEach((field) => validateField(field, formData[field]));
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchUsers();
        setIsModalOpen(false);
        setSuccessModalOpen(true);
        setFormData({ // Limpiar los campos
          nombre: '',
          email: '',
          password: '',
          n_documento_identidad: '',
          sede: '',
          rol: '', // Limpiar el nuevo campo
          n_ficha: '',
          jornada: '',
          nombre_del_programa: ''
        });
      } else {
        setErrorModalOpen(true); // Mostrar modal de error
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorModalOpen(true); // Mostrar modal de error si hay un fallo
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Lista de Usuarios</h1>
      <div className="clsBotones">
        <button className='clsBtnRegistrar' onClick={handleOpenModal}>Registrar Usuario</button>
        <button className='clsBtnSalir' onClick={handleLogout}>Salir</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Documento</th>
            <th>Sede</th>
            <th>Rol</th> {/* Nueva columna */}
            <th>Ficha</th>
            <th>Jornada</th>
            <th>Programa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_usuario}>
              <td>{user.id_usuario}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.n_documento_identidad}</td>
              <td>{user.sede}</td>
              <td>{user.rol}</td> {/* Mostrar el nuevo campo */}
              <td>{user.n_ficha}</td>
              <td>{user.jornada}</td>
              <td>{user.nombre_del_programa}</td>
              <td>
                <button className='clsBtnEB'>Editar</button>
                <button className='clsBtnEB'>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registrar Usuario</h2>
            <form onSubmit={handleRegister}>
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  <label>{field.replace(/_/g, ' ').toUpperCase()}:</label>
                  <InputCustomComponent
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    error={errors[field]}
                  />
                </div>
              ))}
              <button type="submit">Registrar</button>
              <button type="button" onClick={handleCloseModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {successModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Registro Exitoso!</h2>
            <p>El usuario se registró correctamente.</p>
            <button onClick={handleCloseSuccessModal}>Cerrar</button>
          </div>
        </div>
      )}

      {errorModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Error en el Registro</h2>
            <p>No se pudo registrar el usuario. Por favor, inténtelo de nuevo.</p>
            <button onClick={handleCloseErrorModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;