import React from 'react';
import { useQuery } from 'react-query';
import { listRequestBuilder } from '../api/api/v1/tasks/list/index';

const fetchTasks = async () => {
    const tasks = await listRequestBuilder.get();
    return tasks;
}

const Tasks = () => {
    const { data: tasks, isLoading, error } = useQuery('tasks', fetchTasks);

    if (isLoading) {
        return <div>Now Loading...</div>;
    }
    if (error) {
        return <div>Error!: {error.message}</div>
    }

    return (
        <div>
            <h1>TodoList</h1>
            <ul >
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Tasks;
