import React, {useContext} from 'react';
import {Home, Login} from './pages'

import { Route, Routes, Navigate } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'
import Context from './contexts/Context';

const AppRoutes = () => {
   const {auth} = useContext(Context)
   const [user] = useAuthState(auth)

   return user ?(
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path="*" element={<Navigate to='/'/>} />
      </Routes>
   ):(
      <Routes>
         <Route path='/login' element={<Login/>}/>
         <Route path="*" element={<Navigate to='/login'/>} />
      </Routes>
   )
};

export default AppRoutes;