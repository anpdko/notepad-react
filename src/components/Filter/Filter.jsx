import React, {useState} from 'react'
import styles from './Filter.module.scss'
import { FunnelFill } from 'react-bootstrap-icons'

const Filter = ({tags, setTags}) => {
   const [toggleTab, setToggleTab] = useState(true)

   const tagActive = (id) => {
      setTags(tags.map((tagData)=>{
         return tagData.id === id?{...tagData, active:!tagData.active}:tagData
      }))
   }

   return (
      <div className={styles.filter}>
         <div onClick={()=>setToggleTab(!toggleTab)}  className={styles.tab_filter}>
            <FunnelFill/>
            <span className={styles.tilter_text}>
               {toggleTab?"Закрыть ":"Открыть "}
               фильтр
            </span>
            <span className={styles.line}></span>
         </div>
         <div className={`${styles.filter_tags} ${toggleTab?styles.active:''}`}>
            {tags.map((tag) => 
               <span key={tag.id} onClick={()=>tagActive(tag.id)} className={`${styles.tag} ${tag.active?styles.active:''}`}>{tag.tag}</span>
            )}
         </div>
      </div>
   );
};
export default Filter