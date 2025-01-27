import { useState, useEffect } from "react";
import { fetchUsers, addUser as apiAddUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from './api';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", username: "", email: "", website: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError("Failed to fetch users.");
            }
        };
        loadUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await apiUpdateUser(form.id, form);
                setUsers(users.map(user => (user.id === form.id ? form : user)));
            } else {
                // Generate a new ID based on existing users
                const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
                const newUser = { ...form, id: newId }; // Assign new ID
                await apiAddUser(newUser);
                alert("User successfully added!"); // Alert on successful addition
                setUsers([...users, newUser]); // Add new user directly
            }
            resetForm();
        } catch (err) {
            setError("Operation failed.");
        }
    };

    const resetForm = () => {
        setForm({ id: null, name: "", username: "", email: "", website: "" });
        setIsEditing(false);
    };

    const handleDeleteUser = async (id) => {
        try {
            await apiDeleteUser(id); // Call the API to delete the user
            setUsers(prevUsers => {
                const updatedUsers = prevUsers.filter(user => user.id !== id); // Remove the deleted user
                // Reassign IDs to ensure they are sequential
                return updatedUsers.map((user, index) => ({ ...user, id: index + 1 }));
            });
            alert("User successfully deleted!"); // Alert on successful deletion
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    return (
        <div className="app-container">
            <div className="container"> 
            <h1 className="header">User Management Dashboard</h1>
            <ErrorMessage message={error} />
            <UserForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} isEditing={isEditing} />
            <h2 className="user-list-header">User List</h2>
            <UserTable users={users} editUser={(user) => { setForm(user); setIsEditing(true); }} deleteUser={handleDeleteUser} />
        </div>
        </div>
    );
};

export default App;
