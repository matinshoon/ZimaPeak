import React, { useState, useEffect } from 'react';
import TrashCan from '../components/TrashCan'; // Import the Trash component

const TrashPage = () => {
    const [reloadTable, setReloadTable] = useState(false); // State to trigger table reload

    useEffect(() => {
        // Set reloadTable to true to trigger table reload when the component mounts
        setReloadTable(true);
    }, []);

    return (
        <div className="container mt-5">
            <TrashCan reloadTable={reloadTable} onEmailsSelected={() => { }} />
        </div>
    );
};

export default TrashPage;
