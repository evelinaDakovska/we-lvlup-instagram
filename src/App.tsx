import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserStartPage from './pages/onStartPageUser'
import GuestStartPage from './pages/onStartPageGuest'
/* import Button from '@mui/material/Button' */

function App() {
    const user = false
    return (
        <div className="App">
            <h1>Welcome to Instagram!</h1>
            <Routes>
                <Route
                    path="/"
                    element={user ? <UserStartPage /> : <GuestStartPage />}
                />
            </Routes>
        </div>
    )
}

export default App
