import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import './Dashboard.css';

const DoctorPortal = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const patientsPerPage = 7;


    //   For Dynamic Data (Backend Api)

    //   useEffect(() => {
    //     // Fetch data from API
    //     axios.get('/') 
    //       .then(response => {
    //         setData(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //       });
    //   }, []);



    // For Static Data set
    useEffect(() => {
        setTimeout(() => {
            const staticData = [
                {
                    id: 1,
                    name: 'John Doe',
                    dailyVisits: 3,
                    timePerVisit: 30,
                    weeklyTarget: 15,
                    callsPerDay: 2
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    dailyVisits: 2,
                    timePerVisit: 45,
                    weeklyTarget: 10,
                    callsPerDay: 3
                }
                ,
                {
                    id: 3,
                    name: 'Broke mith',
                    dailyVisits: 3,
                    timePerVisit: 45,
                    weeklyTarget: 10,
                    callsPerDay: 5
                }
                ,
                {
                    id: 4,
                    name: 'Rolex Men',
                    dailyVisits: 5,
                    timePerVisit: 45,
                    weeklyTarget: 8,
                    callsPerDay: 2
                }
                ,
                {
                    id: 5,
                    name: 'Robin Rengis',
                    dailyVisits: 1,
                    timePerVisit: 25,
                    weeklyTarget: 5,
                    callsPerDay: 1
                }
                ,
                {
                    id: 6,
                    name: 'Broke Lesnor',
                    dailyVisits: 6,
                    timePerVisit: 50,
                    weeklyTarget: 15,
                    callsPerDay: 6
                }
                ,
                {
                    id: 7,
                    name: 'Deno James',
                    dailyVisits: 8,
                    timePerVisit: 66,
                    weeklyTarget: 9,
                    callsPerDay: 5
                }
                ,
                {
                    id: 8,
                    name: 'Alison',
                    dailyVisits: 4,
                    timePerVisit: 35,
                    weeklyTarget: 15,
                    callsPerDay: 3
                }
                ,
                {
                    id: 9,
                    name: 'Leonor',
                    dailyVisits: 1,
                    timePerVisit: 35,
                    weeklyTarget: 7,
                    callsPerDay: 4
                }
                ,
                {
                    id: 10,
                    name: 'Brish',
                    dailyVisits: 2,
                    timePerVisit: 25,
                    weeklyTarget: 8,
                    callsPerDay: 4
                }
            ];

            setData(staticData);
        }, 1000);
    }, []);

    const handleEdit = (id) => {
        // Find the patient with the provided id
        const patient = data.find((p) => p.id === id);
        console.log('Edit clicked for patient:', patient);
    };

    const handleDelete = (id) => {
        // Filter out the patient with the provided id
        const updatedData = data.filter((p) => p.id !== id);
        setData(updatedData);
        console.log('Delete clicked for patient:', id);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const filteredPatients = data.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="doctor-portal">
            <h1>Doctor Portal for FitPeo Manager</h1>
            <input
                type="text"
                placeholder="Search by patient name"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient ID</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Daily Visits</TableCell>
                            <TableCell>Time per Visit</TableCell>
                            <TableCell>Weekly Target</TableCell>
                            <TableCell>Calls per Day</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPatients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.dailyVisits}</TableCell>
                                <TableCell>{patient.timePerVisit}</TableCell>
                                <TableCell>{patient.weeklyTarget}</TableCell>
                                <TableCell>{patient.callsPerDay}</TableCell>
                                <TableCell>
                                    <IconButton className="edit-icon" onClick={() => handleEdit(patient.id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton className="delete-icon" onClick={() => handleDelete(patient.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="pagination">
                {filteredPatients.length > patientsPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredPatients.length / patientsPerPage))
                            .fill()
                            .map((_, index) => (
                                <li
                                    key={index}
                                    className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DoctorPortal;
