import {useState} from 'react'
import useAuth from '../auth/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
function Login() {
    const { login, error, loading,role } = useAuth();
    const[formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
        // redirect based on role after login
        if(role === 'admin'){
            navigate('/admin');
        } else if(role === 'librarian'){
            navigate('/librarian');
        } else {
            navigate('/student');
        }


    };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 '>
      <h2 className='text-2xl font-bold color-blue-200 mb-6 mt-0'>Login</h2>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-96'>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
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
        className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors'
        
        >
            {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className='text-red'>{error}</p>}
      <p className='mt-4'>Don't have an account? <a href="/register" className='text-blue-500 hover:underline'>Register</a></p>
      <p className='mt-2'>Forgot your password? <a href="/reset" className='text-blue-500 hover:underline'>Reset it</a></p>
    </div>
    
  )
}

export default Login