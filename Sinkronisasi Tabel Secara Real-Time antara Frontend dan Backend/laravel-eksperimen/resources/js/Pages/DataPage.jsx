import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function DataPage({ data }) {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/data', { name, value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
