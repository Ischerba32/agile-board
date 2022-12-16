import { CardContent, Typography } from '@mui/material'
import React from 'react'

export const Task = ({ task }) => {
  return (
    <CardContent>
      <Typography
        color={'black'}
        gutterBottom
        style={{fontSize: 18}}
      >
        {task?.title}
        </Typography>
      <Typography
        color={'black'}
        gutterBottom
      >
        {task?.description}
        </Typography>
    </CardContent>
  )
}
