import { Routes, Route } from 'react-router-dom';
import Register from './pages/register/register';
import Login from './pages/login/login';
import UsersTable from './pages/users/users';
function App() {
  return (
    <Routes>
      <Route path="/" element={< Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<UsersTable />} />
    </Routes>
  );
}

export default App;