import { CardContent, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import User from '../common/user';

export const Task = observer(({ task }: any) => {
  return (
    <CardContent draggable>
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
        <User user={task.assignee} />
    </CardContent>
  )
})
