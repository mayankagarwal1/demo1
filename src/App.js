import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react'

function App() {
  const [data,setData] = useState(null)
  useEffect(() => {
    fetch('https://mayankagarwal1.github.io/my-server/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (

    <div >
      <header >
      <h1>My React App</h1>
        {data ? (
          <div>
            <h2>Data from GitHub Pages Server:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </header>
    </div>
  );
}

export default App;
