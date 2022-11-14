
const getArrTags = (notes) => {
   let arrTags = []
   for(let i=0; i<notes.length; i++){
      let arrTag = notes[i].tag
      for(let j=0; j<arrTag.length; j++){
         if(!arrTags.includes(arrTag[j]) && /#[0-9A-Za-z]/.test(arrTag[j])){
            arrTags.push(arrTag[j])
         }
      }
   }
   return arrTags.map((tag, index)=>{
      return {
         id: index+1,
         tag: tag,
         active: false
      }
   })
}

export { getArrTags }