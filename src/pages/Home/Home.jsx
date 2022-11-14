import React, {useState} from 'react'
import styles from './Home.module.scss'
import {Sidebar, Textedit} from '../../components';
import { useEffect } from 'react';
import { getArrTags } from '../../services/tags.service'
import { getNotesAllFirebase } from '../../api/node.api'

const Home = () => {
   const [notes, setNotes] = useState([])
   const [tags, setTags] = useState([])
   const [idActiveNode, setIdActiveNode] = useState(1)

   const fetchData = async () => {
      const data = await getNotesAllFirebase()
      console.log(data)
      if(data.length > 0){
         setNotes(data.map((item =>{return{...item, save: true}})))
         setTags(getArrTags(data))
         setIdActiveNode(data[0].id)
      }
   }

   useEffect(()=>{
      fetchData()
   }, [])


   return (
      <div className={styles.container}>
         <Sidebar 
            idActiveNode = {idActiveNode}
            setIdActiveNode={setIdActiveNode} 
            notes={notes} 
            setNotes={setNotes} 
            tags={tags} 
            setTags={setTags}
         />
         <Textedit 
            setNotes={setNotes} 
            notes={notes} 
            idActiveNode={idActiveNode} 
            setTags={setTags}
         />
      </div>
   );
};
export default Home