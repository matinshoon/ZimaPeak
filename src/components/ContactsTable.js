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
    const [priorityFilter, setPriorityFilter] = useState(null);
    const [editableResult, setEditableResult] = useState({ id: null, result: '' });
    // Calculate total number of pages
    const totalContacts = tableData.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
        pageNumbers.push(i);
    };
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem('token');

    const handleEditNote = (id, note) => {
        setEditingNoteId(id);
        setEditedNote(note);
    };

    const saveEditedNote = async (id) => {
        try {
            await axios.put(`${baseUrl}/update`, {
                ids: [id],
                Note: editedNote
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowClick = (id) => {
        setSelectedRowId(id === selectedRowId ? null : id); // Toggle selected row
    };

    const handlePriorityFilterChange = (priority) => {
        setPriorityFilter(priority);
    };

    useEffect(() => {
        fetchData();
        handleEmailsSelected();
    }, [reloadTable, selectedItems, filterOption, showActiveOnly, priorityFilter]); // Include priorityFilter in the dependency array

    const fetchData = async () => {
        try {
            let url = `${baseUrl}/data`;

            const queryParams = [];

            if (filterOption) {
                queryParams.push(`filterOption=${filterOption}`);
            }

            if (showActiveOnly) {
                queryParams.push('status=active');
            }

            if (priorityFilter) {
                queryParams.push(`priority=${priorityFilter}`); // Add priority filter parameter to the query
            }

            queryParams.push('trash=0');

            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }

            console.log('Fetching data from URL:', url);

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            let filteredData = response.data;

            const role = localStorage.getItem('role');
            if (role !== 'admin') {
                const username = localStorage.getItem('username');
                filteredData = filteredData.filter(item => item.added_by === username);
            }

            const uniqueItems = [];
            const duplicateIds = new Set();
            filteredData.forEach(item => {
                if (uniqueItems.some(uniqueItem => uniqueItem.Phone === item.Phone || uniqueItem.Email === item.Email)) {
                    duplicateIds.add(item.id);
                } else {
                    uniqueItems.push(item);
                }
            });

            if (duplicateIds.size > 0) {
                await axios.put(`${baseUrl}/update`, {
                    ids: Array.from(duplicateIds),
                    trash: '1',
                    deleted_by: localStorage.getItem('username')
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            uniqueItems.forEach(item => {
                item.resultColor = getResultColor(item.Result);
            });

            setTableData(uniqueItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to filter the table data based on priority
    const filterTableByPriority = (data) => {
        if (priorityFilter) {
            return data.filter(item => item.Priority === priorityFilter);
        }
        return data;
    };

    const handleFilterOption = (option) => {
        const lowercaseOption = option.toLowerCase();
        setFilterOption(option);
        setSelectedItem(option);
        setSelectedItems([]);
    };

    const handleShowActiveOnly = () => {
        setShowActiveOnly(!showActiveOnly);
        setSelectedItems([]);
    };

    const handleSelect = (id) => {
        if (id !== undefined) {
            setSelectedItems((prevSelectedItems) => {
                if (prevSelectedItems.includes(id)) {
                    return prevSelectedItems.filter((item) => item !== id);
                } else {
                    return [...prevSelectedItems, id];
                }
            });
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(tableData.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    };

    const handleActionConfirmation = (action) => {
        setActionToConfirm(action);
        setShowConfirmationModal(true);
    };

    const handleDelete = async () => {
        try {
            if (selectedItems.length === 0) {
                return;
            }

            const username = localStorage.getItem('username');

            const requestData = {
                ids: selectedItems,
                trash: '1',
                deleted_by: username
            };

            await axios.put(`${baseUrl}/update`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchData();
        } catch (error) {
            console.error('Error updating items:', error);
        }
    };

    const handleToggleSingleActivate = async (id) => {
        try {
            const currentItem = tableData.find((item) => item.id === id);
            const updatedStatus = currentItem.status === 'active' ? 'inactive' : 'active';

            const updatedData = tableData.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: updatedStatus
                    };
                }
                return item;
            });

            setTableData(updatedData);

            await axios.put(`${baseUrl}/update`, {
                ids: [id],
                status: updatedStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.error('Error toggling activation:', error);
        }
    };

    const handleToggleActivate = async () => {
        try {
            const updatedData = tableData.map((item) => {
                if (selectedItems.includes(item.id)) {
                    return {
                        ...item,
                        status: item.status === 'active' ? 'inactive' : 'active'
                    };
                }
                return item;
            });

            setTableData(updatedData);

            await axios.put(`${baseUrl}/update`, {
                ids: selectedItems,
                status: selectedItems.map((id) => {
                    const currentItem = updatedData.find((item) => item.id === id);
                    return currentItem.status;
                })
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.error('Error toggling activation:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTableData = tableData.filter(item => {
        const searchLowerCase = searchQuery?.toLowerCase();
        if (!searchLowerCase) return true;
        return (
            item.Name?.toLowerCase().includes(searchLowerCase) ||
            item.Phone?.toLowerCase().includes(searchLowerCase) ||
            item.Email?.toLowerCase().includes(searchLowerCase) ||
            item.niche?.toLowerCase().includes(searchLowerCase) ||
            item.Result?.toLowerCase().includes(searchLowerCase) ||
            item.Website?.toLowerCase().includes(searchLowerCase)
        );
    });

    const handleEmailsSelected = () => {
        const selectedContacts = filteredTableData
            .filter(item => selectedItems.includes(item.id))
            .map(item => ({ id: item.id, email: item.Email }));
        onEmailsSelected(selectedContacts);
    };

    const handleResultEdit = (id, result) => {
        setEditableResult({ id, result });
    };

    const handleResultChange = (event) => {
        setEditableResult({ ...editableResult, result: event.target.value });
    };

    const saveEditableResult = async (id) => {
        try {
            await axios.put(`${baseUrl}/update`, {
                ids: [id],
                Result: editableResult.result
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedData = tableData.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        Result: editableResult.result
                    };
                }
                return item;
            });

            setTableData(updatedData);
            setEditableResult({ id: null, result: '' }); // Reset editing state
        } catch (error) {
            console.error('Error updating result:', error);
        }
    };

    const resultOptions = ['interested', 'not interested', 'call back', 'voice mail', 'follow up'];

    const getResultColor = (result) => {
        switch (result) {
            case 'interested':
            case 'Interested':
                return 'green';
            case 'not interested':
            case 'Not interested':
            case 'Not Interested':
            case 'Not Intrested':
            case 'Not intrested':
                return 'red';
            case 'voicemail':
            case 'Voicemail':
            case 'voice mail':
            case 'Voice mail':
            case 'Voice Mail':
            case 'call back':
            case 'Call Back':
            case 'Call back':
            case 'callback':
                return 'orange';
            case 'follow up':
            case 'Follow Up':
            case 'Follow up':
            case 'follow-up':
            case 'Follow-Up':
            case 'Follow-up':
                return 'blue';
            case 'Ongoing':
                return 'gray';
            default:
                return 'inherit';
        }
    };


    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <div className='col-1'>
                    <Dropdown>
                        <Dropdown.Toggle className='link-secondary' variant="none" id="priority-filter-dropdown">
                            Priority
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handlePriorityFilterChange(null)}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePriorityFilterChange(1)}>Priority 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePriorityFilterChange(2)}>Priority 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePriorityFilterChange(3)}>Priority 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
                            Select
                        </th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Owner</th>
                        {/* <th>Social Media</th> */}
                        <th>Result</th>
                        <th>Niche</th>
                        <th>Emails Sent</th>
                        {localStorage.getItem('role') === 'admin' && <th>Added By</th>}
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTableData
                        .slice((currentPage - 1) * contactsPerPage, currentPage * contactsPerPage)
                        .map((item) => (
                            <React.Fragment key={item.id}>
                                <tr onClick={() => handleRowClick(item.id)} style={{ fontWeight: item.priority === 1 ? 'bold' : 'normal', color: item.priority === 1 ? 'red' : 'inherit' }}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelect(item.id)}
                                            checked={selectedItems.includes(item.id)}
                                        />
                                    </td>
                                    <td><span style={{ color: item.status === 'active' ? 'black' : 'silver' }}>{item.Name}</span></td>
                                    <td><a href={`tel:${item.Phone}`} style={{ color: item.status === 'active' ? 'black' : 'silver', textDecoration: 'none' }}>{item.Phone}</a></td>
                                    <td><span style={{
                                        color: item.status === 'active' ? 'black' : 'silver', display: 'block',
                                        maxWidth: '150px', // Set maximum width for the content
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}>{item.Email}</span></td>
                                    <td>
                                        <span style={{
                                            color: item.status === 'active' ? 'black' : 'silver',
                                            display: 'block',
                                            maxWidth: '150px', // Set maximum width for the content
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <a href={item.Website} target="_blank" rel="noopener noreferrer">{item.Website}</a>
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            color: item.status === 'active' ? 'black' : 'silver',
                                            display: 'block',
                                            maxWidth: '150px', // Set maximum width for the content
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {item.Owner}
                                        </span>
                                    </td>
                                    <td>
                                        {editableResult.id === item.id ? (
                                            <select
                                                value={editableResult.result}
                                                onChange={handleResultChange}
                                                onBlur={() => saveEditableResult(item.id)}
                                            >
                                                {resultOptions.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span
                                                style={{
                                                    cursor: 'pointer',
                                                    color: item.resultColor,
                                                }}
                                                onClick={() => handleResultEdit(item.id, item.Result)}
                                            >
                                                {item.Result}
                                            </span>
                                        )}
                                    </td>

                                    <td><span style={{ color: item.status === 'active' ? 'black' : 'silver' }}>{item.niche}</span></td>
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
