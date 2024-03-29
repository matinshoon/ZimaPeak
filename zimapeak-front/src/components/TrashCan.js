import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'; // Import the undo icon
import Dropdown from 'react-bootstrap/Dropdown';


const Trash = ({ onEmailsSelected, onDelete, reloadTable }) => {
    const [tableData, setTableData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // State for Select All checkbox
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [actionToConfirm, setActionToConfirm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRowId, setSelectedRowId] = useState(null); // State to track the selected row ID
    const [editingNoteId, setEditingNoteId] = useState(null); // State to track the ID of the note being edited
    const [editedNote, setEditedNote] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(50); // Set the number of contacts per page

    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleRowClick = (id) => {
        setSelectedRowId(id === selectedRowId ? null : id); // Toggle selected row
    };

    useEffect(() => {
        fetchData();
        handleEmailsSelected();
    }, [reloadTable, selectedItems]);

    const fetchData = async () => {
        try {
            let url = `${baseUrl}/data?trash=1`; // Add query parameter to filter entities in trash

            // Fetch data from the modified URL
            const response = await axios.get(url);
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSelect = (id) => {
        if (id !== undefined) {
            setSelectedItems((prevSelectedItems) => {
                // If the clicked checkbox was already selected, deselect it
                if (prevSelectedItems.includes(id)) {
                    return prevSelectedItems.filter((item) => item !== id);
                } else {
                    // If the clicked checkbox was not selected, select it
                    return [...prevSelectedItems, id];
                }
            });
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            // Deselect all items
            setSelectedItems([]);
        } else {
            // Select all items
            setSelectedItems(tableData.map((item) => item.id));
        }
        setSelectAll(!selectAll); // Toggle selectAll state
    };

    const handleActionConfirmation = (action) => {
        setActionToConfirm(action);
        setShowConfirmationModal(true);
    };

    const handleDelete = async () => {
        try {
            // Ensure that at least one item is selected for deletion
            if (selectedItems.length === 0) {
                return;
            }

            // Send a DELETE request to the backend to delete selected items
            await axios.delete(`${baseUrl}/delete`, {
                data: { ids: selectedItems }
            });

            fetchData();
        } catch (error) {
            console.error('Error deleting items:', error);
        }
    };

    const handleReturn = async (id) => {
        try {
            // Send a PUT request to update the trash column to 0
            await axios.put(`${baseUrl}/update`, {
                ids: [id],
                trash: '0'
            });

            // Refetch data to update the table
            fetchData();
        } catch (error) {
            console.error('Error returning item from trash:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleEmailsSelected = () => {
        onEmailsSelected();
    };

    // Calculate indexes of contacts to be displayed on the current page
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = tableData.slice(indexOfFirstContact, indexOfLastContact);

    // Calculate total number of pages
    const totalContacts = tableData.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Function to handle page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <div className='col-1  d-flex align-items-center'>
                    <FontAwesomeIcon type='button' className="link-secondary mx-3" icon={faTrash} onClick={() => handleActionConfirmation('delete')} />
                </div>
                <div className='col-3 d-flex align-items-center'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control mx-1"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <span><input type="checkbox" onChange={handleSelectAll} checked={selectAll} />{' '}</span>
                            Select</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Emails sent</th>
                        <th>Deleted By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.map((item) => (
                        <React.Fragment key={item.id}>
                            <tr onClick={() => handleRowClick(item.id)}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleSelect(item.id)}
                                        checked={selectedItems.includes(item.id)}
                                    />
                                </td>
                                <td><span>{item.Name}</span></td>
                                <td><span>{item.Email}</span></td>
                                <td><span>{item.Website}</span></td>
                                <td className='text-center'><span>{item.emails_sent}</span></td>
                                <td><span>{item.deleted_by}</span></td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleReturn(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faUndo} />
                                    </button>
                                </td>
                            </tr>
                            {item.id === selectedRowId && (
                                <tr>
                                    <td colSpan="7">
                                        {item.id === selectedRowId && (
                                            editingNoteId === item.id ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={editedNote}
                                                    />
                                                </div>
                                            ) : (
                                                <div>{item.Note}</div>
                                            )
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {showConfirmationModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="close" onClick={() => setShowConfirmationModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to {actionToConfirm}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        setShowConfirmationModal(false);
                                        if (actionToConfirm === 'delete') {
                                            handleDelete();
                                        }
                                    }}
                                >
                                    Confirm
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Trash;
