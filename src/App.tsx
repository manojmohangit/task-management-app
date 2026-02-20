import { BrowserRouter, Routes, Route } from 'react-router';
import ToDoApp from './pages/ToDoApp';
import AddTaskForm from './pages/AddTaskForm';
import EditTaskForm from './pages/EditTaskForm';
import NotFoundPage from './pages/NotFoundPage';
import { TaskContextProvider } from './TaskStorageContext';
import { ToastProvider } from './components/Toast/context';
import './App.css';

function App() {

  return (
    <>
      <ToastProvider>
        <TaskContextProvider>
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<ToDoApp />} />
              <Route path="/add" element={<AddTaskForm />} />
              <Route path="/edit/:id" element={<EditTaskForm />} />
              <Route path="*" element={<NotFoundPage/>} />
            </Routes>
          </BrowserRouter>
        </TaskContextProvider>
      </ToastProvider>
    </>
  )
}

export default App;
