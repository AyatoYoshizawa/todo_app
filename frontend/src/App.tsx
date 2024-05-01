import './App.css'
import Tasks from './components/Tasks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Box, Toolbar } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TasksCreate from './components/TasksCreate';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AppBar>
            <Toolbar>
              <Typography>
                TodoApp
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ marginTop: "40px", padding: "20px" }}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Tasks />} />
                <Route path="*" element={<h1>ページが存在しません</h1>} />
                <Route path="/create" element={<TasksCreate />}/>
              </Routes>
            </BrowserRouter>
          </Box>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default App
