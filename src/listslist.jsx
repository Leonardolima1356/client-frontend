import './Userslist.module.css'

import { useEffect, useState } from 'react'
import { api } from './api/api'
import { Menu } from './components/menu'

function ListsList() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
  
  if (loading) return <p>Carregando produtos...</p>
  if (error) return <p>{error}</p>

  return (
    <>
    <section>
      <Menu/>
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
    </section>
    </>
  )
}

export default ListsList