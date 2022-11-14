import React, {useState} from 'react'
import styles from './Cart.module.scss'
import {
   ThreeDotsVertical, 
   PencilSquare, 
   EraserFill,
   FileEarmarkArrowDownFill,
   FileEarmarkCheckFill
} from 'react-bootstrap-icons'

const Cart = ({idActiveNode, onClick, note, setSave, delatyNote}) => {
   const [activeMenu, setActiveMenu] = useState(false)
   const [activAnimCart, setActivAnimCart] = useState(false)

   const cutText = (str, countChar) => {
      if(str.length > countChar){
         return str.slice(0, countChar) + '...'
      }
      return str
   }

   const animCart = () => {
      setActivAnimCart(true)
      setTimeout(() => setActivAnimCart(false), 400)
   }


   return (
      <div 
         onClick={()=>{onClick(); animCart()}}
         className={`
            ${styles.cart} 
            ${idActiveNode === note.id?styles.active:''}
         `} 
         key={note.id}
      >
         <h3>{note.title}</h3>
         <p>{cutText(note.text, 140)}</p>
         <span className={styles.dots}>
               {note.save
                  ?<FileEarmarkCheckFill 
                     className={`${styles.is_save} ${styles.green}`}
                  /> 
                  :<div className={styles.pulse}>
                     <FileEarmarkArrowDownFill 
                        onClick={()=> {setSave(note.id, note)}}
                        className={`${styles.is_save} ${styles.red}`}
                     />
                  </div>
               }
            <ThreeDotsVertical 
               className={styles.btn_dots}
               onClick={()=>setActiveMenu(!activeMenu)}
            />
            <ul className={`${styles.menu} ${activeMenu?styles.active:''}`}>
               <li onClick={()=>{onClick(); animCart()}}><PencilSquare/>open</li>
               <li onClick={()=>{setActiveMenu(false); delatyNote(note.id)}} className={styles.eraser}><EraserFill/>delete</li>
            </ul>
         </span>

         <div style={{display: activAnimCart?'block':'none'}} className={styles.anim_cart}>
            <h3>{note.title}</h3>
            <p>{cutText(note.text, 140)}</p>
         </div>
      </div>
   );
};
export default Cart