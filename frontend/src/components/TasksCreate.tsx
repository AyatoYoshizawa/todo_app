import { useState } from 'react';
import { API } from '../api';
import { useMutation } from '@apollo/client';
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskCreate = () => {
    const navigate = useNavigate();

    const [titleAsState, setTitle] = useState('');
    const [statusAsState, setStatus] = useState(0);

    const handleChange = (event) => {
      setTitle(event.target.value);
    };

    const onBack = () => {
      navigate('/');
    };
    
    // 入力内容を送信
    const handleSubmit = async () => {
      try {
        const result = await API.instance.createTaskApiV1TasksCreatePost({
          taskCreate: {
            title: titleAsState,
            status, statusAsState,
          }
        });
        console.log("タスクを作成しました。", result);
        onBack();
      } catch (error) {
        console.error("タスクを作成できませんでした。", error),
        onBack();
      }
    }

    return (
        <>
            <h1>新規登録</h1>
            <Stack spacing={10} direction='row'>
                <TextField 
                    label="title" 
                    value={titleAsState}
                    onChange={handleChange}
                    autoFocus
                />
                <Button onClick={handleSubmit}>作成する</Button>
                <Button variant='contained' color='primary' onClick={onBack}>一覧に戻る</Button>
            </Stack>
        </>
    )
}

export default TaskCreate;
