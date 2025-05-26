import './Userslist.module.css'

import { useEffect, useState } from 'react'
import { api } from './api/api'

function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUsers(){
      try {
        const response = await api.get('/users')
        setUsers(response.data)
        // console.log(response.data)
      } catch (err) {
        setError('Error ao carregar usuarios', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])
  
  if (loading) return <p>Carregando usuário...</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{padding: '2rem'}}>
        <h1>Lista de Usuários</h1>
        <h1>
          {users.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - <i>{item.email}</i>
              </li>
          ))}
        </h1>
    </div>
  )
}

export default UsersList