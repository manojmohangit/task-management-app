import { createBrowserRouter, RouterProvider } from 'react-router';
import ToDoApp from './pages/ToDoApp';
import AddTaskForm from './pages/AddTaskForm';
import EditTaskForm from './pages/EditTaskForm';
import NotFoundPage from './pages/NotFoundPage';
import { TaskContextProvider } from './TaskStorageContext';
import { ToastProvider } from './components/Toast/context';
import './App.css';


let router = createBrowserRouter([
  {
    path: "/",
    element: <ToDoApp />
  },
  {
    path: "/add",
    element: <AddTaskForm />
  },
  {
    path: "/edit/:id",
    element: <EditTaskForm />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
], {
  basename: '/task-management-app/'
});

function App() {

  return (
    <>
      <ToastProvider>
        <TaskContextProvider>
          <RouterProvider router={router} />
        </TaskContextProvider>
      </ToastProvider>
    </>
  )
}

export default App;
