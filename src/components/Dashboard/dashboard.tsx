import {useState, useCallback} from 'react'
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './column';
import { NewTaskDialog } from './newTaskDialog';

const getListStyle = (isDraggingOver) => {
  return {
    backgroundColor: isDraggingOver ? 'lighblue' : 'lightgray',
    padding: 8,
    minHeight: 500
  }
}

export const Dashboard = observer(() => {
  const { boards } = useStore();
  const [newTask, setNewTask] = useState(null);

  const closeDialog = useCallback(() => {
    setNewTask(null);
  }, [setNewTask])

  const onDragEnd = useCallback(event => {
    const {source, destination, draggableId: taskId} = event;

    boards.active.moveTask(taskId, source, destination);
  }, [boards]);


   return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards?.active?.sections.map((section) => (
            <Grid item key={section.id} xs>
              <Paper>
                <Box
                  p={1}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography variant='h6'>{section.title}</Typography>
                  <Button variant="outlined" color="primary" onClick={() => {
                      setNewTask(section.id);
                    }}>
                      ADD
                    </Button>
                </Box>
                <Droppable droppableId={section.id} key={section.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDragginOver)}
                    >
                      <Column section={section} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
      <NewTaskDialog
        open={!!newTask}
        sectionId={newTask}
        handleClose={closeDialog}
      />
    </Box>
  )
})
