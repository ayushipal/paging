
// src/Pagination.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setEmployees(response.data);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    fetchEmployees();
  }, []);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const nextPage = () => {
    if (currentPage < Math.ceil(employees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Displaying buttons and current page number below the table */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: '0 15px' }}>{currentPage}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;