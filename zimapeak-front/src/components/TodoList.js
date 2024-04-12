import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const TodoList = () => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the current task input value
  const [taskInput, setTaskInput] = useState('');
  // State to store the index of the task being edited
  const [editIndex, setEditIndex] = useState(null);

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/todo-get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Load tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to handle adding a new task
  const handleAddTask = async () => {
    if (taskInput.trim() !== '') {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const baseUrl = process.env.REACT_APP_BASE_URL;
      try {
        await axios.post(
          `${baseUrl}/todo-make`,
          { name: taskInput.trim(), added_by: username },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setTaskInput(''); // Clear the input field after adding the task
        fetchTasks(); // Fetch tasks again to get the updated list from the server
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Function to handle removing a task
  const handleRemoveTask = async (index) => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;
    try {
      await axios.delete(`${baseUrl}/todo/${tasks[index].id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  // Function to handle toggling task completion
  const handleToggleCompletion = async (index) => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    try {
      await axios.put(
        `${baseUrl}/todo/${tasks[index].id}`, // Adjusted endpoint URL
        { name: tasks[index].name, completed: updatedTasks[index].completed }, // Include both name and completed fields
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to enter edit mode for a task
  const handleEditTask = (index) => {
    if (editIndex !== index) {
      setEditIndex(index);
      setTaskInput(tasks[index].name); // Populate input field with task name
    }
  };

  // Function to handle saving edited task
  const handleSaveEditedTask = async (index, newName) => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const updatedTasks = [...tasks];
    const taskId = tasks[index].id; // Retrieve the task ID
    updatedTasks[index].name = newName.trim();
    try {
      await axios.put(
        `${baseUrl}/todo/${taskId}`, // Use the task ID instead of index
        { name: newName.trim(), completed: tasks[index].completed },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTasks(updatedTasks);
      setEditIndex(null); // Exit edit mode
    } catch (error) {
      console.error('Error saving edited task:', error);
    }
  };

  return (
    <div className="card d-flex flex-column justify-content-between" style={{ height: '92vh' }}>
      <div className="card-header text-center">
        <h5>To-Do List</h5>
      </div>
      <div className="card-body">
        {/* Display the list of tasks */}
        <ul className="list-group list-group-flush">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {/* Edit mode */}
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEditedTask(index, taskInput);
                      } else if (e.key === 'Escape') {
                        setEditIndex(null);
                      }
                    }}
                  />
                  <button className="btn" onClick={() => handleSaveEditedTask(index, taskInput)}>
                    Save
                  </button>
                  <button className="btn" onClick={() => setEditIndex(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                // View mode
                <div onClick={() => handleEditTask(index)}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(index)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className={task.completed ? 'text-decoration-line-through ms-2' : 'ms-2'}>
                    {task.name}
                  </span>
                </div>
              )}
              <button className="btn" onClick={() => handleRemoveTask(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        {/* Task input field */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
