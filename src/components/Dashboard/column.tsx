import React from 'react'
import { Card } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

import { Task } from './task';

const getItemStyle = (draggableStyle) => {
  return {
    padding: 8,
    marginBottom: 8,
    ...draggableStyle
  }
}

export const Column = observer(({ section }: any) => {
  return (
    <div>
      {section.tasks.map((task, index) => (
        <Draggable draggableId={task.id} key={task.id} index={index}>
          {(provided) => (
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(provided.draggableProps.style)}
            >
              <Task task={task} />
            </Card>
          )}
        </Draggable>
      ))}
    </div>
  )
})
