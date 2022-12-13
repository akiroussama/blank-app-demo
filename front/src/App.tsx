import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Welcome from './components/Welcome'


function App() {
    const [errorMessage, setErrorMessage] = useState('');
    const [isAuthed, setIsAuthed] = useState(false);
    const [username, setUsername] = useState('');
    const handleLogin = ({ token, error }: { token: string, error: string }) => {
        if (token) {
            setIsAuthed(true);
        } else {
            setErrorMessage(error || 'Invalid username or password');
        }
  };
 
 
    return (
    <div className="lg:container lg mx-auto m-10">
      {isAuthed ? (
    <Welcome
          username={username}
          onLogout={() => {
            setIsAuthed(false);
            setUsername('');
          }}
        />
        ) : (
      <LoginForm onLogin={handleLogin} errorMessage={errorMessage}></LoginForm>
        )}
    </div>
  )
}

export default App