import { useNavigate } from "react-router";
import MenuImg from "../assets/img/14018854.png"
import styles from './menu.module.css'
import { useState } from "react";

export const Menu = () => {
    const Navigate = useNavigate();
    const [open, setOpen] = useState(false)
    
    const goToUsers = () => Navigate('/userslist')
    const goToDashboard = () => Navigate('/dashboard')
    const goToProducts = () => Navigate('/listslist')
    const logout = () => {
        localStorage.removeItem('user')
        Navigate('/')
    }

    return(
        <nav className={open ? styles.navBar : styles.navBarClosed}>
            <img src={MenuImg} alt="Menu Icon" onClick={() => setOpen(prev => !prev)}/>
            <p onClick={goToDashboard}>Dashboard</p>
            <p>Criar Usuário</p>
            <p onClick={goToUsers}>Lista de usuário</p>
            <p>Criar produto</p>
            <p onClick={goToProducts}>Lista de produtos</p>
            <p onClick={logout}>Sair</p>
        </nav>
    )
}