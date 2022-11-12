import "./PrimaryButton1.css";
import React from 'react'
import { Button } from '@mui/material'

const PrimaryButton1 = (props) => {
  return (
    <Button variant='contained' color='success' onClick={props.on}
    sx={{
      backgroundColor: '#F8C55C',
      padding: '10px 30px',
      color: '#272727',
      marginRight: '30px',
      borderRadius: '28px',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#F8C55C',
        color: '#9494B6',
    },
    }}>
        {props.text}
    </Button>
  )
}

export default PrimaryButton1