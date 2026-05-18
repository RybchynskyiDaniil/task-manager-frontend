import axiosInstance from '../api/axiosInstance';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'inProgress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
};

export const fetchTasks = async ():Promise<Task[]> => {
    const response = await axiosInstance.get('/api/tasks');
    return response.data.tasks;
};

export const createTask = async (task: { title: string; priority?: string }) => {
    const response = await axiosInstance.post('/api/tasks', task);
    return response.data;
}