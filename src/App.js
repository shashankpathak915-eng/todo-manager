import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: '', priority: 'Medium', status: 'Pending' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("Database connection issue", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("Please enter a task title");

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post(API_URL, { ...formData, id: Date.now().toString() });
    }
    setFormData({ title: '', priority: 'Medium', status: 'Pending' });
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setFormData({ title: todo.title, priority: todo.priority, status: todo.status });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task permanently?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📝 Task Tracker & To-Do Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-0 bg-light">
            <h5>{editingId ? "✏️ Edit Task" : "➕ Create New Task"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input type="text" placeholder="What needs to be done?" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="mb-2">
                <label className="small text-muted m-0 d-block mb-1">Priority Level</label>
                <select className="form-select" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium Priority</option>
                  <option value="Low">🟢 Low Priority</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="small text-muted m-0 d-block mb-1">Current Status</label>
                <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Pending">⌛ Pending</option>
                  <option value="Completed">✅ Completed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-dark w-100">{editingId ? "Save Changes" : "Add Task"}</button>
            </form>
          </div>
        </div>
        
        <div className="col-md-8">
          <table className="table table-hover shadow-sm bg-white rounded align-middle">
            <thead className="table-dark">
              <tr><th>Task Description</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {todos.map(t => (
                <tr key={t.id}>
                  <td style={{ textDecoration: t.status === 'Completed' ? 'line-through' : 'none' }}>{t.title}</td>
                  <td><span className={`badge ${t.priority === 'High' ? 'bg-danger' : t.priority === 'Medium' ? 'bg-warning text-dark' : 'bg-success'}`}>{t.priority}</span></td>
                  <td><span className={`badge ${t.status === 'Completed' ? 'bg-success' : 'bg-secondary'}`}>{t.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;
