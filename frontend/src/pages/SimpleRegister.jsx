import { useState } from 'react';
import axios from 'axios';

function SimpleRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const res = await axios.post(`${apiBaseUrl}/api/simple-users/register`, { name, email });
      setMessage(res.data.message);
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-12 max-w-sm rounded-xl border border-gray-100 bg-white p-8 shadow-soft">
      <h2 className="text-lg font-bold text-text mb-6 text-center">Simple User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          className="input-field" 
        />
        <input 
          placeholder="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="input-field" 
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="btn-primary w-full"
        >
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-xs text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-4 text-center text-xs text-primary font-medium">{error}</p>}
    </div>
  );
}

export default SimpleRegister;
