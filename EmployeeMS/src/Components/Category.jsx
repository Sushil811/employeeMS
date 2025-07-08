import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Category() {
  const [category, setCategory] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.status) { // Use lowercase 'status'
          setCategory(result.data.Result)
        } else {
          setError(result.data.Error || "Failed to fetch categories.")
        }
      })
      .catch(err => {
        setError("An error occurred while fetching categories.")
        console.log(err)
      })
  }, [])

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to='/dashboard/add_category' className='btn btn-success'>Add Category</Link>
      <div className='mt-3'>
        <table className='table table-bordered table-striped'>
          <caption>List of Categories</caption>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              category.length === 0 ? (
                <tr>
                  <td colSpan={1} className="text-center">No categories found.</td>
                </tr>
              ) : (
                category.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category