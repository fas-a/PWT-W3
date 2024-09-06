import React from 'react';
import useStore from './zustand/store';

const ZustandCounter = () => {
    const { count, increment, decrement } = useStore();
    const massIncrement = () => {
        for (let i = 0; i < 100; i++) {
            increment();
        }
    };

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={massIncrement}>Mass Increment</button>
        </div>
    );
};

export default ZustandCounter;
