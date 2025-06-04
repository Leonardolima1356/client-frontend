import { useState, useEffect } from 'react'
import style from './App.module.css'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import Contact from './Contact'

function App() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storageUser = localStorage.getItem('user')
    if(storageUser){
      setUser(JSON.parse(storageUser))
      navigate('/dashboard')
    }
  }, [navigate])

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login', {email, password})
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/dashboard')
      console.log(response.data)
    } catch (error) {
      setMessage('Erro no login: ' + (error.response.data?.message || 'verifique os dados'))
    }
  }

  const handleContactClick = () => {
    navigate('/contact')
  }

  return (
    <div className={style.wrapLogin}>

      <div className={style.wrapLog}>
        <div className={style.degrade}></div>
      </div>
        <div className={style.wrapForm}>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="submit">entrar</button>
          <p>{message}</p>
            <div className={style.wrapContact}>
              <button onClick={handleContactClick}>Entrar em Contato</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default App
