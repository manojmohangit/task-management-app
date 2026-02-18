import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router';
import ToDoApp from './pages/ToDoApp';
import AddTaskForm from './pages/AddTaskForm';
import EditTaskForm from './pages/EditTaskForm';

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ToDoApp />} />
            <Route path="/add" element={<AddTaskForm />} />
            <Route path="/edit" element={<EditTaskForm />} />
          </Routes>
        </BrowserRouter>

    </>
  )
}

export default App;
