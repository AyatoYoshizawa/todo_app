import { useQuery } from 'react-query';
import { API } from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Task } from '../api/axios';

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
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            }
        </>
    )
}

export default Tasks;
