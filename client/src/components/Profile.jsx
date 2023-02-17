import React from 'react'

import withAuth from '../hoc/withAuth'

const Profile = ({ user }) => {
  return (
    <div>Profile</div>
  )
}

export default withAuth(Profile)