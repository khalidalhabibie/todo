import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=56a04dec0cd3b560087ce17a99087be0`);
        setWeather(data.weather[0].description);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };
    fetchWeather();
  }, []);

  const handleAddTask = () => {
    if (!input) return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div>Weather Today: {weather}</div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks"
      />
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => handleToggleComplete(task.id)}>Toggle</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
