/*   */
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Button from '@mui/material/Button'

function App() {
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Button variant="contained">Hello</Button>
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
                <p>You can do this, I believe in you.</p>
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
                <h2>Who are we?</h2>
                <p>That feels like an existential question, don't you think?</p>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    )
}
