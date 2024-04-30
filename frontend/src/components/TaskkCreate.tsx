import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskCreate = () => {
    const navigate = useNavigate();

    const onBack = () => {
        navigate('/');
    }

    return (
        <>
            <h1>新規登録</h1>
            <Stack spacing={10} direction='row'>
                <Button variant='contained' color='primary' onClick={onBack}>一覧に戻る</Button>               
            </Stack>
        </>
    )
}

export default TaskCreate;
