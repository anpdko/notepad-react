
import { firestore } from '../index'
import { 
   doc, 
   addDoc, 
   collection, 
   getDocs, 
   deleteDoc, 
   setDoc, 
   query, 
   orderBy
} from '@firebase/firestore'



const newNoteFirebase = async (data) => {
   const dbRef = await collection(firestore, 'notes');
   let newIdNote = null;
   await addDoc(dbRef, data)
   .then(docRef => {
      newIdNote = docRef.id;
      console.log("Заметка добавленена");
   })
   .catch(error => {
      console.log(error);
   })
   return newIdNote
}

const updateNoteFirebase = async (id, data) => {
   const docRef = await doc(firestore, "notes", id);
   let status = false;
   await setDoc(docRef, {
      title: data.title,
      text: data.text,
      tag: data.tag,
      date: data.date,
      uid: data.uid
   })
   .then(docRef => {
      status = true;
      console.log("Заметка обновлена");
   })
   .catch(error => {
      console.log(error);
   })
   return status
}

const getNotesAllFirebase = async () => {
   // const docRef = doc(firestore, "users", '10ySKaSb2TbSCgItWKJhTpEJLTq1');
   const colRef = collection(firestore, "notes");

   //where("capital", "==", true)
   const q = query(colRef, orderBy("date", 'desc')); // desc || asc

   try {
      const querySnapshot = await getDocs(q);
      const data = []
      querySnapshot.forEach((doc) => {
         data.push({id: doc.id, ...doc.data()})
      });
      return data
   }
   catch (error) {
      console.log(error);
   }
}

const delatyNoteFirebase = async (id) => {
   const docRef = doc(firestore, "notes", id);
   let status = false;
   await deleteDoc(docRef)
   .then(() => {
      status = true;
      console.log("Заметка удалена");
   })
   .catch((error) => {
      console.log(error);
   })
   return status;
}

export {
   newNoteFirebase,
   updateNoteFirebase,
   getNotesAllFirebase,
   delatyNoteFirebase
}


