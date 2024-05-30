import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faTrash } from '@fortawesome/free-solid-svg-icons';

const LeadsPage = () => {
    // Sample data
    const data = [
        { id: 1, Name: 'John Doe', Phone: '123456789', Email: 'john@example.com', Website: 'https://example.com', Owner: 'Jane Doe', Result: 'Ongoing', niche: 'Sample Niche', emails_sent: 3, added_by: 'Admin', status: 'active', priority: 3 },
        // Add more sample data here if needed
    ];

    return (
        <>
        <div className='container'> 
    <div className="d-flex justify-content-between mb-3">
        <div className='col-1'>
            <Dropdown>
                <Dropdown.Toggle className='link-secondary' variant="none" id="priority-filter-dropdown">
                    Priority
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>All</Dropdown.Item>
                    <Dropdown.Item>Priority 1</Dropdown.Item>
                    <Dropdown.Item>Priority 2</Dropdown.Item>
                    <Dropdown.Item>Priority 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle className='link-secondary' variant="none" id="dropdown-basic">
                    Selected Item
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Last Hour</Dropdown.Item>
                    <Dropdown.Item>Last Day</Dropdown.Item>
                    <Dropdown.Item>Last Week</Dropdown.Item>
                    <Dropdown.Item>Last Month</Dropdown.Item>
                    <Dropdown.Item>All Times</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div className='col-1  d-flex align-items-center'>
            <FontAwesomeIcon type='button' className="link-secondary" icon={faPowerOff} />
            <FontAwesomeIcon type='button' className="link-secondary mx-3" icon={faTrash} />
        </div>
        <div className='col-2 d-flex align-items-center'>
            <input
                className="form-check-input mx-1"
                type="checkbox"
                id="showActiveOnly"
                checked={true}
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
                value="searchQuery"
            />
        </div>
    </div>
    <table className="table">
        <thead>
            <tr>
                <th>
                    <span><input type="checkbox" onChange={() => { }} checked={true} />{' '}</span>
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
                <th>Added By</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {/* Sample data mapping */}
            <tr>
                <td>
                    <input
                        type="checkbox"
                        onChange={() => { }}
                        checked={true}
                    />
                </td>
                <td><span>Name</span></td>
                <td><a href={`tel:123456789`}>123456789</a></td>
                <td><span>Email</span></td>
                <td>
                    <span>
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a>
                    </span>
                </td>
                <td>
                    <span>Owner</span>
                </td>
                <td>
                    <span>Result</span>
                </td>
                <td><span>Niche</span></td>
                <td className='text-center'><span>Emails Sent</span></td>
                <td><span>Added By</span></td>
                <td>
                    <span style={{ color: 'green' }}>Active</span>
                </td>
            </tr>
        </tbody>
    </table>
    <nav>
        <ul className="pagination">
            {/* Pagination buttons */}
            <li className="page-item">
                <button className="page-link">1</button>
            </li>
        </ul>
    </nav>
    </div>
        </>
    );
};

export default LeadsPage;
