import React from 'react';

const UserForm = ({ form, handleChange, handleSubmit, isEditing }) => (
  <div className="form-container">
    <h2 className="form-header">{isEditing ? "Edit User" : "Add User"}</h2>
    <form onSubmit={handleSubmit}>
      {['name', 'username', 'email', 'website'].map((field) => (
        <input 
          key={field}
          type={field === 'email' ? 'email' : 'text'} 
          name={field} 
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
          value={form[field]} 
          onChange={handleChange} 
          className="input-field" 
          required 
        />
      ))}
      <button type="submit" className="submit-button">
        {isEditing ? "Update User" : "Add User"}
      </button>
    </form>
  </div>
);

export default UserForm;
