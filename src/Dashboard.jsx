import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu } from "./components/menu";
import { api } from "./api/api";
import styles from './Dashboard.module.css';

function Dashboard(){
    const Navigate = useNavigate()
    const [userConst, setUserConst] = useState(0)
    const [productConst, setProductConst] = useState(0)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(!storedUser) Navigate('/')
    }, [Navigate])
    
    useEffect(() => {
      async function fetchData(){
        try {
            const [usersRes, productsRes] = await Promise.all([
                api.get('/users'),
                api.get('/lists'),
            ])
            setUserConst(usersRes.data.length)
            setProductConst(productsRes.data.length)
        } catch (err) {
            console.log("Erro ao buscar dados do Dashboard", err)
        }
      }
      fetchData()
    }, [])
    

    console.log(userConst, productConst)
    return(
        <section>
            <Menu/>
            <div className={styles.wrapNav}>
                <div className={styles.wrapItem} onClick={() => Navigate('/#')}>
                    <p>Criar produto</p>
                </div>
                <div className={styles.wrapItem} onClick={() => Navigate('/listslist')}>
                    <p>Lista de produtos - ({productConst}, produtos)</p>
                </div>
                <div className={styles.wrapItem} onClick={() => Navigate('/#')}>
                    <p>Criar usuário</p>
                </div>
                <div className={styles.wrapItem} onClick={() => Navigate('/userslist')}>
                    <p>Lista de usuário - ({userConst}, usuários)</p>
                </div>
            </div>
        </section>
    )
}

export default Dashboard