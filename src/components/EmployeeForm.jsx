import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    contactInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', role: '', department: '', contactInfo: '' }); // Reset the form after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UsersTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Omaan', phone: '1234567890', role: 'Teacher', department: 'Math', updatedTime: 'August 8, 2024' },
    { id: 2, name: 'Mallick', phone: '3121286800', role: 'Admin', department: 'IT', updatedTime: 'July 8, 2024' },
    // Add more user data here
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    role: '',
    department: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All Roles');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (user) => {
    setIsEditing(user.id);
    setEditForm(user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTime = new Date().toLocaleString();
    setUsers(users.map(user => (user.id === isEditing ? { ...editForm, updatedTime } : user)));
    setIsEditing(null);
  };

  const handleDeleteClick = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddNewUser = () => {
    setIsModalOpen(true);
  };

  const handleAddUserSubmit = (newUser) => {
    const user = {
      id: users.length + 1,
      name: newUser.name,
      role: newUser.role,
      phone: newUser.contactInfo,
      department: newUser.department,
      updatedTime: new Date().toLocaleString(),
    };
    setUsers([...users, user]);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All Roles' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-2xl font-semibold">Add New Employee</h1>
          <div className="flex space-x-4">
            <button onClick={handleAddNewUser} className="bg-blue-500 text-white px-4 py-2 rounded-lg">New Employee +</button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded-lg w-1/3"
            />
            <select
              className="border px-3 py-2 rounded-lg"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option>All Roles</option>
              <option>Admin</option>
              <option>Teacher</option>
              <option>Super Admin</option>
              {/* Add other roles as needed */}
            </select>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">
                
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Role</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Department</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Updated Time</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-gray-200">
                      <input type="checkbox" />
                    </td>
                    {isEditing === user.id ? (
                      <>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="text"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="text"
                            name="role"
                            value={editForm.role}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="text"
                            name="department"
                            value={editForm.department}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">{new Date().toLocaleString()}</td>
                        <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                          <button
                            onClick={handleEditSubmit}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{user.phone}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{user.department}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{user.updatedTime}</td>
                        <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUserSubmit}
      />
    </div>
  );
};

export default UsersTable;
