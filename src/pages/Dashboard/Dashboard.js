import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const [first, setfirst] = useState('')
  const navigate=useNavigate()
  return (
    <Button onClick={() => {
      setfirst('frmoo')
      navigate('/test')
    }}>Check my button</Button>
  )
}

export default Dashboard