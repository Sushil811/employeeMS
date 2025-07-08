import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate input
        if (!category.trim()) {
            setError('Category cannot be empty');
            setLoading(false);
            return;
        }

        console.log('Sending category data:', { category });

        // Make API request
        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                console.log('Category response:', result.data);
                if (result.data.status) {
                    alert('Category added successfully!');
                    navigate('/dashboard/category');
                } else {
                    setError(result.data.Error || 'Failed to add category');
                }
            })
            .catch(err => {
                console.error('Category error:', err);
                if (err.code === 'ECONNREFUSED') {
                    setError('❌ Server is not running. Please start the server first.');
                } else if (err.response) {
                    setError(err.response.data?.Error || `Server error: ${err.response.status}`);
                } else if (err.request) {
                    setError('Network error - please check your connection');
                } else {
                    setError('An error occurred while adding the category');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded-0 w-25 border'>
                <h2>Add Category</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Category:</strong></label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            placeholder='Add Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='form-control rounded-0'
                            disabled={loading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className='btn btn-success w-100 rounded-0 mb-2'
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Category'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;