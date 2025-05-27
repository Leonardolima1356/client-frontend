import './Userslist.module.css'

import { useEffect, useState } from 'react'
import { api } from './api/api'

function UsersList() {
  const [users, setUsers] = useState([])
  const [lists, setLists] = useState([])
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

  useEffect(() => {
    async function fetchLists(){
      try {
        const response = await api.get('/lists')
        setLists(response.data)
        // console.log(response.data)
      } catch (err) {
        setError('Error ao carregar listas', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLists()
  }, [])
  
  if (loading) return <p>Carregando usuário...</p>
  if (error) return <p>{error}</p>

  return (
    <>
    <div style={{padding: '2rem'}}>
        <h1>Lista de Usuários</h1>
        <ul>
          {users.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - <i>{item.email}</i>
              </li>
          ))}
        </ul>
    </div>
    <div style={{padding: '2rem'}}>
          <h1>Lista de Produtos</h1>
          <ul>
            {lists.map((item) => (
              <li key={item.id}>
                <strong>{item.description}</strong> <br/> 
                <i>Preço: {item.price}</i><br /> 
                <i>Quantidade: {item.quantity}</i><br/> 
                <img src={item.image} alt="item" style={{width: 200, height: 'auto'}}/>
              </li>
            ))}
          </ul>
    </div>
    </>
  )
}

export default UsersList