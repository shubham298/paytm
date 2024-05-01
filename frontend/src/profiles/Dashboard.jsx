import React from 'react'
import AppBar from '../components/AppBar'
import Balance from "../components/Balance";
import Users from '../components/User';

const Dashboard = () => {
  
  return (
    <>
    <AppBar>
    </AppBar>
    <div className='p-4 m-4'>
      <Balance amount={'10,000'} ></Balance>
      <Users></Users>
    </div>
    </>
  )
}

export default Dashboard