import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

    type RouteData = {
        path: string,
        element: ReactElement,
    };

    const routes: RouteData[] = [
        {
            path: '/',
            element: <Skills/>
        },
        {
            path: '/skills',
            element: <Skills/>
        }
    ]

}

export default App;
