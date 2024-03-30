import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faTrash } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';


const ContactsTable = ({ onEmailsSelected, onDelete, reloadTable }) => {
    const [tableData, setTableData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // State for Select All checkbox
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [actionToConfirm, setActionToConfirm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [showActiveOnly, setShowActiveOnly] = useState(true);
    const [selectedItem, setSelectedItem] = useState('All Times');
    const [selectedRowId, setSelectedRowId] = useState(null); // State to track the selected row ID
    const [editingNoteId, setEditingNoteId] = useState(null); // State to track the ID of the note being edited
    const [editedNote, setEditedNote] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(50); // Set the number of contacts per page

    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleEditNote = (id, note) => {
        setEditingNoteId(id);
        setEditedNote(note);
    };

    // Function to save the edited note
    const saveEditedNote = async (id) => {
        try {
            // Send a PUT request to update the note in the backend
            await axios.put(`${baseUrl}/update`, {
                ids: [id],
                Note: editedNote // Pass the edited note value
            });

            // Update the table data with the modified note
            const updatedData = tableData.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        Note: editedNote
                    };
                }
                return item;
            });

            setTableData(updatedData);
            setEditingNoteId(null); // Reset editing state
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleRowClick = (id) => {
        setSelectedRowId(id === selectedRowId ? null : id); // Toggle selected row
    };

    useEffect(() => {
        fetchData();
        handleEmailsSelected();
    }, [reloadTable, selectedItems, filterOption, showActiveOnly]);

    const fetchData = async () => {
        try {
            let url = `${baseUrl}/data`;

            // Construct query parameters
            const queryParams = [];

            // Add filterOption parameter if it exists
            if (filterOption) {
                queryParams.push(`filterOption=${filterOption}`);
            }

            // Add status parameter if showActiveOnly is true
            if (showActiveOnly) {
                queryParams.push('status=active');
            }

            // Add trash parameter to exclude entities with trash value of 1
            queryParams.push('trash=0');

            // Check if there are any query parameters to append
            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }

            console.log('Fetching data from URL:', url);

            // Fetch data from the modified URL
            const response = await axios.get(url);
            let filteredData = response.data;

            // Check if the role in localStorage is admin
            const role = localStorage.getItem('role');
            if (role !== 'admin') {
                // Filter data based on added_by matching sessionKey
                const sessionKey = localStorage.getItem('sessionKey');
                filteredData = filteredData.filter(item => item.added_by === sessionKey);
            }

            // Set the table data to the filtered data
            setTableData(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleFilterOption = (option) => {
        // Convert the option to lowercase
        const lowercaseOption = option.toLowerCase();
        setFilterOption(option);
        setSelectedItem(option);
        // Clear selected items when changing filter options
        setSelectedItems([]);
    };


    const handleShowActiveOnly = () => {
        setShowActiveOnly(!showActiveOnly);
        // Clear selected items when toggling show active only
        setSelectedItems([]);
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

            // Get sessionKey from local storage
            const username = localStorage.getItem('username');

            // Prepare the data object for the PUT request
            const requestData = {
                ids: selectedItems,
                trash: '1',
                deleted_by: username
            };

            // Send a PUT request to update selected items
            await axios.put(`${baseUrl}/update`, requestData);

            // Refetch data to update the table
            fetchData();
        } catch (error) {
            console.error('Error updating items:', error);
        }
    };


    const handleToggleSingleActivate = async (id) => {
        try {
            // Find the item with the specified id
            const currentItem = tableData.find((item) => item.id === id);

            // Toggle the status of the item
            const updatedStatus = currentItem.status === 'active' ? 'inactive' : 'active';

            // Update the status of the item in the table data
            const updatedData = tableData.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: updatedStatus
                    };
                }
                return item;
            });

            // Update the table data with the modified item
            setTableData(updatedData);

            // Send a PUT request to update the status of the item in the backend
            await axios.put(`${baseUrl}/update`, {
                ids: [id],
                status: updatedStatus
            });
        } catch (error) {
            console.error('Error toggling activation:', error);
        }
    };


    const handleToggleActivate = async () => {
        try {
            // Map through all selected items and toggle their status
            const updatedData = tableData.map((item) => {
                if (selectedItems.includes(item.id)) {
                    return {
                        ...item,
                        status: item.status === 'active' ? 'inactive' : 'active'
                    };
                }
                return item;
            });

            // Update the table data with the modified items
            setTableData(updatedData);

            // Send a PUT request to update the status of selected items in the backend
            await axios.put(`${baseUrl}/update`, {
                ids: selectedItems,
                status: selectedItems.map((id) => {
                    const currentItem = updatedData.find((item) => item.id === id);
                    return currentItem.status;
                })
            });
        } catch (error) {
            console.error('Error toggling activation:', error);
        }
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTableData = tableData.filter(item => {
        const searchLowerCase = searchQuery?.toLowerCase(); // Safely access toLowerCase()
        if (!searchLowerCase) return true; // If searchLowerCase is null or undefined, return true
        return (
            item.Name?.toLowerCase().includes(searchLowerCase) ||
            item.Phone?.toLowerCase().includes(searchLowerCase) ||
            item.Email?.toLowerCase().includes(searchLowerCase) ||
            item.Website?.toLowerCase().includes(searchLowerCase)
        );
    });

    const handleEmailsSelected = () => {
        const selectedContacts = filteredTableData
            .filter(item => selectedItems.includes(item.id)) // Filter selected items
            .map(item => ({ id: item.id, email: item.Email })); // Extract user ID and email address
        onEmailsSelected(selectedContacts);
    };


    // Calculate indexes of contacts to be displayed on the current page
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredTableData.slice(indexOfFirstContact, indexOfLastContact);

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
                <div className='col-1'>
                    <Dropdown>
                        <Dropdown.Toggle className='link-secondary' variant="none" id="dropdown-basic">
                            {selectedItem}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleFilterOption('lastHour')}>Last Hour</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterOption('lastDay')}>Last Day</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterOption('lastWeek')}>Last Week</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterOption('lastMonth')}>Last Month</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterOption('All Times')}>All Times</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='col-1  d-flex align-items-center'>
                    <FontAwesomeIcon type='button' className="link-secondary" icon={faPowerOff} onClick={handleToggleActivate} />
                    <FontAwesomeIcon type='button' className="link-secondary mx-3" icon={faTrash} onClick={() => handleActionConfirmation('delete')} />
                </div>
                <div className='col-2 d-flex align-items-center'>
                    <input
                        className="form-check-input mx-1"
                        type="checkbox"
                        id="showActiveOnly"
                        checked={showActiveOnly}
                        onChange={handleShowActiveOnly}
                    />
                    <label className="form-check-label" htmlFor="showActiveOnly">
                        Active Only
                    </label>
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
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Emails Sent</th>
                        {localStorage.getItem('role') === 'admin' && <th>Added By</th>}
                        <th>Status</th>
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
                                <td><span style={{ color: item.status === 'active' ? 'black' : 'silver' }}>{item.Name}</span></td>
                                <td><a href={`tel:${item.Phone}`} style={{ color: item.status === 'active' ? 'black' : 'silver', textDecoration: 'none' }}>{item.Phone}</a></td>
                                <td><span style={{ color: item.status === 'active' ? 'black' : 'silver' }}>{item.Email}</span></td>
                                <td><span style={{ color: item.status === 'active' ? 'black' : 'silver' }}>{item.Website}</span></td>
                                <td className='text-center'><span style={{ color: item.status === 'active' ? 'black' : 'silver' }}>{item.emails_sent}</span></td>
                                {localStorage.getItem('role') === 'admin' && (
                                    <td><span style={{ color: item.status === 'active' ? 'black' : 'silver' }}>{item.added_by}</span></td>
                                )}

                                <td>
                                    <span
                                        style={{ color: item.status === 'active' ? 'green' : 'silver', cursor: 'pointer' }}
                                        onClick={() => handleToggleSingleActivate(item.id)}
                                    >
                                        {item.status}
                                    </span>
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
                                                        onChange={(e) => setEditedNote(e.target.value)}
                                                    />
                                                    <button onClick={() => saveEditedNote(item.id)}>Save</button>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleEditNote(item.id, item.Note)}>{item.Note}</div>
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
                                <button type="button" className="btn btn-danger" onClick={() => { setShowConfirmationModal(false); actionToConfirm === 'delete' ? handleDelete() : handleToggleActivate() }}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactsTable;
