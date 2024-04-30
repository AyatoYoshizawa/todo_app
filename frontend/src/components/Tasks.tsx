import { useQuery } from 'react-query';
import { API } from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Task } from '../api/axios';
import { Button, Stack } from '@mui/material';

const Tasks = () => {
    const query = useQuery<Array<Task>>('tasks', () => {
        return API.instance.getTasksApiV1TasksListGet();
    }, {
        onSuccess(data) {
            console.info('SUCCESS', data);
        },
        onError(err) {
            console.error('ERROR', err);
            window.alert(err);
        }
    });


    const onEdit = (task: Task) => {
        console.log('EDIT', task);
        // todo    
    }

    const onDelete = (task: Task) => {
        console.log('DELETE', task);
        // todo    
    }

    return (
        <>
            <h1>一覧</h1>

            {query.isLoading || query.isFetching &&
                <CircularProgress />
            }

            {query.isSuccess &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Title
                            </TableCell>
                            <TableCell>
                                <br />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {query.data?.map(task =>
                            <TableRow key={task.id}>
                                <TableCell>
                                    #{task.id}

                                </TableCell>
                                <TableCell>
                                    {task.title}
                                </TableCell>
                                <TableCell>
                                    <Stack spacing={10} direction='row'>
                                        <Button variant='contained' color='primary' onClick={() => onEdit(task)}>編集</Button>
                                        <Button variant='outlined' color="error" onClick={() => onDelete(task)}>削除</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            }
        </>
    )
}

export default Tasks;
