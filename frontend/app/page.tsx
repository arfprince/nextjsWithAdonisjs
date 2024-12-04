// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <h1>hello frontend!</h1>
//     </div>
//   );
// }

'use client'; // Client-side component

import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', fullName: '', email: '' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3333/users'); // Assuming your backend is running here
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:3333/users', newUser);
      fetchUsers(); // Refresh the list after adding the user
      setNewUser({ fullName: '', email: '', password: '' }); // Reset form
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUserData = async () => {
    try {
      const response = await axios.put(`http://localhost:3333/users/${updateUser.id}`, updateUser);
      fetchUsers(); // Refresh the list after updating
      setUpdateUser({ id: '', fullName: '', email: '' }); // Reset form
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/users/${id}`);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">User Management</h1>

        {/* Add User Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Add User</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                onClick={addUser}
                className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Add User
              </button>
            </div>
          </div>

          {/* Update User Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Update User</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="User ID"
                value={updateUser.id}
                onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="text"
                placeholder="Full Name"
                value={updateUser.fullName}
                onChange={(e) => setUpdateUser({ ...updateUser, fullName: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={updateUser.email}
                onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                onClick={updateUserData}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Update User
              </button>
            </div>
          </div>

          {/* User List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Users List</h2>
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md">
                  <span className="text-gray-800">{user.fullName} - {user.email}</span>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

