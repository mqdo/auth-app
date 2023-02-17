import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Header, Login, Signup, Profile, EditProfile, Error } from './components'

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.isAuthenticated && !user.id) {
      navigate('/signup');
    } else {
      navigate(`/user/${user.id}`);
    }
  }, [user])

  return null;
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/user/:id'
          element={
            <Profile>
              <Header />
            </Profile>
          }
        />
        <Route
          path='/user/edit/:id'
          element={
            <EditProfile>
              <Header />
            </EditProfile>
          }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App