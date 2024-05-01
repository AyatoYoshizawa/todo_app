import { useState } from 'react';
import { API } from '../api';
import { useMutation } from '@apollo/client'; // インポート修正
import { Button, Stack, TextField } from "@mui/material"; // TextFieldを追加
import { useNavigate } from "react-router-dom";

const TaskCreate = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const statusInitValue = 0;
    const status = statusInitValue;

    // 入力内容が変更されたらStateのtitleを変更
    const handleChange = (event) => {
        setTitle(event.target.value);
    }
    
    // 入力内容を送信
    const handleSubmit = async () => {
      try {
        const result = await API.instance.createTaskApiV1TasksCreatePostRaw({
            title: title,
            status: status,
        });
        console.log('タスクを作成しました。', result);
      } catch (error) {
        console.error('タスクを作成できませんでした。', error);
      }
    };

    const onBack = () => {
        navigate('/');
    }

    return (
        <>
            <h1>新規登録</h1>
            <Stack spacing={10} direction='row'>
                <TextField 
                    label="title" 
                    value={title}
                    onChange={handleChange}
                />
                <Button onClick={handleSubmit}>作成する</Button>        
                <Button variant='contained' color='primary' onClick={onBack}>一覧に戻る</Button>               
            </Stack>
        </>
    )
}

export default TaskCreate;