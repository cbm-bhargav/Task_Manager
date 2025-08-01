import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphQLClient } from '../lib/graphqlClient';
import { CREATE_TASK } from '../graphql/mutations';

const CreateTaskModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', title: '', description: '' });
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: (variables) => graphQLClient.request(CREATE_TASK, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask.mutate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full mb-4 p-2 border rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
