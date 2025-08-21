import {useState} from 'react'
import useAuth from '../auth/useAuth.jsx';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { register, error, loading } = useAuth();
    const [formData, setFormData] = useState({name:'', email: '', role:'', password: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(formData);
        if (response) {
            navigate('/login');
        }
    };
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100 '>
        <h2 className='text-2xl font-bold text-blue-200 mb-6 mt-0'>Register</h2>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-96'>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className='w-full mb-4 p-2 border rounded'/>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className='w-full mb-4 p-2 border rounded'/>
            <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role (e.g., user, admin)"
            required
            className='w-full mb-4 p-2 border rounded'/>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className='w-full mb-4 p-2 border rounded'
            />
            <button type="submit" disabled={loading}
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors'>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
        {error && <p>{error}</p>}
        </div>


    </div>
  )
}

export default Register;