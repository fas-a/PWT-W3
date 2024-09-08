import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import DataForm from './DataForm';
import DataTable from './DataTable';

function Dashboard({ data: initialData }) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        // Setup Pusher
        const pusher = new Pusher('your-app-key', {
            cluster: 'your-app-cluster',
            encrypted: true,
        });

        // Subscribe to the channel
        const channel = pusher.subscribe('data-updates');

        // Bind to the event
        channel.bind('App\\Events\\DataUpdated', function(newData) {
            // Update the state with the new data
            setData(prevData => [...prevData, newData]);
        });

        // Cleanup on unmount
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    return (
        <div>
            <h1>Real-time Data</h1>
            <DataForm />
            <DataTable data={data} />
        </div>
    );
}

export default Dashboard;
