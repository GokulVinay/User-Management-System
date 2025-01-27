import React from 'react';

const UserTable = ({ users, editUser, deleteUser }) => (
  <table className="user-table">
    <thead>
      <tr>
        {['ID', 'Name', 'Username', 'Email', 'Website', 'Actions'].map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
          <td>
            <button onClick={() => editUser(user)} className="edit-button">Edit</button>
            <button onClick={() => deleteUser(user.id)} className="delete-button">Delete</button> {/* Pass user ID */}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
