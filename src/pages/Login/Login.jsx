import React, {useContext} from 'react'
import styles from './Login.module.scss'
import Context from '../../contexts/Context'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from '../../components/UI'
import { Google, Instagram, Github, Linkedin} from 'react-bootstrap-icons'

const Login = () => {
   const {auth} = useContext(Context)

   const login = async () => {
      const provider = new GoogleAuthProvider()
      const {user} = await signInWithPopup(auth, provider)
      console.log("user: ", user)
   }

   return (
      <div className={styles.container}>
         <div></div>
         <header className={styles.welcome}>
            <h1 className={styles.title}>Welcome to <span className={styles.bold}>Notepad</span></h1>
            <Button onClick={login}><Google/>Войти с помощу гугл</Button>
         </header>
         <footer className={styles.footer}>
            <p>developed by <span className={styles.bold}>Pryadko Andrey</span></p>
            <p>anpdko@gmail.com</p>
            <div className={styles.icons}>
               <a href="https://www.instagram.com/anpdko/"><Instagram/></a>
               <a href="https://github.com/mrsrtAndrey"><Github/></a>
               <a href="https://www.linkedin.com/in/andrey-pryadko-a897211b2/"><Linkedin/></a>
            </div>
         </footer>
      </div>
   );
};
export default Login