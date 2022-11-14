import React, {useContext, useState, useMemo, useCallback} from 'react'
import styles from './Sidebar.module.scss'

import {signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import Context from '../../contexts/Context';
import { Button, Input } from '../../components/UI'
import { BoxArrowLeft, Search } from 'react-bootstrap-icons'
import { Filter, Cart } from '../../components'

import { 
   newNoteFirebase, 
   delatyNoteFirebase, 
   updateNoteFirebase 
} from '../../api/node.api'


const Sidebar = ({idActiveNode, setIdActiveNode, notes, setNotes, tags, setTags}) => {
   const [searchText, setSearchText] = useState('')
   const {auth} = useContext(Context)
   const [user] = useAuthState(auth)
   console.log(user)

   const createNote = async () => {
      let data = {
         uid: user.uid,
         title: '',
         tag: [],
         text: '',
         date: new Date()
      }
      const newIdNote = await newNoteFirebase(data)

      if(!!newIdNote){
         setNotes([{
            id: newIdNote,
            uid: user.uid,
            title: '',
            tag: [],
            text: '',
            save: true,
            date: new Date()
         }, ...notes])
         setIdActiveNode(newIdNote)
      }
   }

   const delatyNote = async (id) => {
      const isDelay = await delatyNoteFirebase(id)
      if(isDelay){
         setNotes(notes.filter((item) => {
            return item.id !== id
         }))
      }
   }

   const setSave = async (id, data) => {
      const isSave = await updateNoteFirebase(id, data)
      if(isSave){
         setNotes(notes.map((item) => {
            return item.id === id?{...item, save: true}:item
         }))
      }
   }

   const sortedTagsSearched = useCallback(() => {
      const isTagActive = tags.some((tag)=>tag.active)
      if(isTagActive){
         return notes.filter(note => {
            const isNoteTag = tags.some((tag) =>{
               return tag.active && note.tag.includes(tag.tag)
            })
            return isNoteTag
         })
      }
      return notes
   }, [notes, tags])

   const sortedSearched = useMemo(()=>{
      const sortedTags = sortedTagsSearched()

      return sortedTags.filter(note => {
         return note.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      })
   }, [searchText, sortedTagsSearched])

   return (
      <div className={styles.sidebar}>
         <div className={styles.user_bar}>
            <img className={styles.user_icon} src={user.photoURL} alt="avater" />
            <div className={styles.info}>
               <h3>{user.displayName}</h3>
               <Button className={styles.btn} onClick={()=>signOut(auth)}><BoxArrowLeft size={16}/>Сменить блокнот</Button>
            </div>
         </div>
         <div className={styles.search}>
            <Input 
               value={searchText} 
               onChange={(e) => setSearchText(e.target.value)} 
               placeholder="Поиск"
            />
            
            <Button style={{paddingLeft: "12px", paddingRight: "12px"}}><Search/></Button>
         </div>
         <Button onClick={createNote}>Создать новую заметку</Button>
         <Filter tags={tags} setTags={setTags}/>
         <div className={styles.carts}>
            {sortedSearched.map((note)=>
               <Cart  
                  setSave = {setSave}
                  idActiveNode = {idActiveNode}
                  onClick={()=> setIdActiveNode(note.id)} 
                  key={note.id} 
                  note={note}
                  delatyNote = {delatyNote}
               />
            )}
         </div>
      </div>
   );
};
export default Sidebar