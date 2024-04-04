import React, {  useContext, useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import { TasksContext } from '../../contexts/TasksContext'

function renderRating(params) {
  return <Rating readOnly value={params.value} />;
}

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200);
      }),
    [],
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.status !== oldRow.status) {
    return `Status from '${oldRow.status}' to '${newRow.status}'`;
  }
  if (newRow.deadline !== oldRow.deadline) {
    return `Deadline from '${oldRow.deadline || ''}' to '${newRow.deadline || ''}'`;
  }
  return null;
}

export default function AskConfirmationBeforeSave() {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const {ongoingTasks, tasks, isLoadingTasks, updateTask } = useContext(TasksContext);

  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [tableTasks, setTableTasks] = useState([]);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  useEffect(() => {
    const transformTasks = ongoingTasks.map((task) => ({
      owner: task.owner,
      id: task._id,
      taskName: task.taskName,
      category: task.category,
      label: task.label.join(', '),
      rating: task.difficulty,
      status: task.status,
      exp: task.exp,
      description: task.description,
      deadline: new Date(task.deadline)
    }));

    setTableTasks(transformTasks);
  }, [tasks]); // Include tasks in the dependency array to ensure useEffect runs when tasks change

  if (isLoadingTasks) {
    return <div>Loading...</div>;
  }

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    try {
      let updatedExp = 0

      if (newRow.deadline > oldRow.deadline) {
        updatedExp = newRow.exp * 0.95
      } else {
        updatedExp = newRow.exp
      }

      var array = newRow.label.split(", ")
      var taskz = {
        _id: newRow.id,
        taskName: newRow.taskName,
        category: newRow.category,
        label: array,
        difficulty: newRow.rating,
        status: newRow.status,
        exp: updatedExp,
        description: newRow.description,
        deadline: new Date(newRow.deadline)
      }
      console.log(taskz)
      updateTask(taskz)
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'Status successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: 'Status cannot be empty', severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {renderConfirmDialog()}
      <DataGrid rows={tableTasks} columns={columns} processRowUpdate={processRowUpdate} />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

const columns = [
  {
    field: 'taskName',
    headerName: 'Task Name',
    type: 'string',
    align: 'left',
    headerAlign: 'left',
    width: 200
  },
  {
    field: 'category',
    headerName: 'Category',
    type: 'string',
    width: 180
  },
  {
    field: 'label',
    headerName: 'Label',
    type: 'string',
    width: 220,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['PLANNING', 'TODO', 'ONGOING', 'COMPLETED', 'DELAYED']
  },
   {
    field: 'deadline',
    headerName: 'Deadline',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    display: 'flex',
    renderCell: renderRating,
    width: 180,
    type: 'number',
  }
];


