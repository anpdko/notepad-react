import React from 'react'
import styles from './Textedit.module.scss'
import { Clock } from 'react-bootstrap-icons'
import { getArrTags } from '../../services/tags.service'
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'

const Textedit = ({setNotes, notes, idActiveNode, setTags}) => {
   const [animText, setAanimText] = useState(true)

   const getNote = () => {
      for(let item of notes) {
         if(item.id === idActiveNode){
            return item
         }
      }
   }

   const setNoteTitle = (title) => {
      setNotes(notes.map((item) => {
         return item.id === idActiveNode?{...item, save: false, title:title}:item
      }))
   }

   const setNoteText = (text) => {
      setNotes(notes.map((item) => {
         return item.id === idActiveNode?{...item, save: false, text:text}:item
      }))
   }

   const setNoteTag = (tag) => {
      const note = getNote()
      const newNotes = notes.map((item) => {
         return item.id === idActiveNode?{...note, save: false, tag: tag.split(' ')}:item
      })
      setNotes(newNotes)
      setTags(getArrTags(newNotes))
   }

   function isEmptyNote() {
      for (let key in getNote()) {
        return false;
      }
      return true;
   }

   useEffect(()=> {
      setAanimText(false)
      setTimeout(() => setAanimText(true), 250)
      return ()=>{
         window.onbeforeunload = function() {
            console.log('1234')
            setTimeout(()=>alert("123"), 1000)
          };
      }
   }, [idActiveNode])


   return (
      !isEmptyNote()
      ?<motion.div 
         className={styles.textedit} 
         transition={{ type: "spring" }}
         animate={{ 
            opacity: animText ? 1 : 0.3,
            x: animText ? 0 : -20
         }}>

         <textarea 
            placeholder='Заголовок...'
            className={styles.title} 
            type="text" 
            onChange={(e) => setNoteTitle(e.target.value)} 
            value={getNote().title} 
         />
         <p className={styles.time}><Clock/>Edited a 21min</p>
         <input 
            placeholder='Добавить тег...'
            className={styles.tags}
            type="text" 
            onChange={(e) => setNoteTag(e.target.value)}
            value={getNote().tag.join(' ')} 
         />
         <textarea 
            placeholder='Запись...'
            className={styles.text} 
            type="text" 
            onChange={(e) => {setNoteText(e.target.value)}} 
            value={getNote().text} 
         />
      </motion.div>
      :<div></div>
   );
};
export default Textedit