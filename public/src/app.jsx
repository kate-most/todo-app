import React from 'react';
import { render } from 'react-dom';
import normalize from 'normalize';
import './app.scss';

const HelloWorld = () => {
    return <h1>Hello World! I am makaroshki</h1>
};

render(
    <HelloWorld />,
    document.getElementById('react-root')
);