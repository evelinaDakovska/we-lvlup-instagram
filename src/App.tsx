import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Button from '@mui/material/Button'

function App() {
    return (
        <div className="App">
            <h1>Welcome to Instagram!</h1>
            <Button variant="contained">Start</Button>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>
        </div>
    )
}

export default App

function Home() {
    return (
        <>
            <main>
                <h2>Welcome to the homepage!</h2>
            </main>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </>
    )
}

function About() {
    return (
        <>
            <main>
                <h2>About</h2>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    )
}
