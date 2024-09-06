import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/store';

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    const massIncrement = () => {
        for (let i = 0; i < 100; i++) {
            dispatch(increment());
        }
    };

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={massIncrement}>Mass Increment</button>
        </div>
    );
};

export default Counter;