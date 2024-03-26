import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [refreshMessage, setRefreshMessage] = useState('');
    const [editableField, setEditableField] = useState({
        userId: null,
        field: null,
        value: ''
    });

    const baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/users`);
            setUsers(response.data);
            setRefreshMessage('Data received successfully.');
            setTimeout(() => {
                setRefreshMessage('');
            }, 3000); // Hide the message after 3 seconds
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleRefresh = () => {
        fetchUsers();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return 'link-success';
            case 'away':
                return 'link-warning';
            case 'offline':
                return 'link-danger';
            default:
                return '';
        }
    };

    const handleFieldClick = (userId, field, value) => {
        setEditableField({
            userId,
            field,
            value
        });
    };

    const handleFieldChange = (e) => {
        setEditableField(prevState => ({
            ...prevState,
            value: e.target.value
        }));
    };

    const handleFieldBlur = async () => {
        try {
            const { userId, field, value } = editableField;
            if (userId && field && value !== '') {
                await axios.put(`${baseUrl}/users/updateStatus?id=${userId}`, {
                    [field]: value
                });
                setEditableField({
                    userId: null,
                    field: null,
                    value: ''
                });
                fetchUsers(); // Refresh user data after updating
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <>
            <div className="card h-100">
                <div className="card-body p-0">
                    <table className="table">
                        <thead className='thead-dark'>
                            <tr className='text-center'>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr className='text-center' key={user.id}>
                                    <td onClick={() => handleFieldClick(user.id, 'username', user.username)}>
                                        {editableField.userId === user.id && editableField.field === 'username' ? (
                                            <input
                                                type="text"
                                                value={editableField.value}
                                                onChange={handleFieldChange}
                                                onBlur={handleFieldBlur}
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td onClick={() => handleFieldClick(user.id, 'email', user.email)}>
                                        {editableField.userId === user.id && editableField.field === 'email' ? (
                                            <input
                                                type="text"
                                                value={editableField.value}
                                                onChange={handleFieldChange}
                                                onBlur={handleFieldBlur}
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td onClick={() => handleFieldClick(user.id, 'fullname', user.fullname)}>
                                        {editableField.userId === user.id && editableField.field === 'fullname' ? (
                                            <input
                                                type="text"
                                                value={editableField.value}
                                                onChange={handleFieldChange}
                                                onBlur={handleFieldBlur}
                                            />
                                        ) : (
                                            user.fullname
                                        )}
                                    </td>
                                    <td onClick={() => handleFieldClick(user.id, 'role', user.role)}>
                                        {editableField.userId === user.id && editableField.field === 'role' ? (
                                            <select
                                                value={editableField.value}
                                                onChange={handleFieldChange}
                                                onBlur={handleFieldBlur}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td onClick={() => handleFieldClick(user.id, 'status', user.status)}>
                                        {editableField.userId === user.id && editableField.field === 'status' ? (
                                            <select
                                                value={editableField.value}
                                                onChange={handleFieldChange}
                                                onBlur={handleFieldBlur}
                                            >
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                            </select>
                                        ) : (
                                            <span className='d-flex align-items-center'>
                                                <FontAwesomeIcon icon={faCircle} className={`${getStatusColor(user.status)} mx-2`} style={{ height: '7px' }} />
                                                {user.status}
                                            </span>
                                        )}
                                    </td>
                                    <td onClick={() => handleFieldClick(user.id, 'state', user.state)}>
                                        {editableField.userId === user.id && editableField.field === 'state' ? (
                                            <select
                                                value={editableField.value}
                                                onChange={handleFieldChange}
                                                onBlur={handleFieldBlur}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        ) : (
                                            user.state
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            <div className='d-flex justify-content-center align-items-center m-3'>
                <FontAwesomeIcon type='button' onClick={handleRefresh} icon={faArrowsRotate} />
                {refreshMessage && <span className="mx-2 text-success">{refreshMessage}</span>}
            </div>
            </div>
        </>
    );
};

export default UsersTable;
