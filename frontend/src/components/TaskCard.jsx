import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE_TASK, UPDATE_TASK } from '../graphql/mutations';
import { graphQLClient } from '../lib/graphqlClient';

const TaskCard = ({ task }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    name: task.name,
    title: task.title,
    description: task.description,
  });

  const updateTask = useMutation({
    mutationFn: (variables) => graphQLClient.request(UPDATE_TASK, variables),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const deleteTask = useMutation({
    mutationFn: async (id) => {
      return await graphQLClient.request(DELETE_TASK, { id });
    },
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleUpdate = () => {
    updateTask.mutate({ id: task.id, ...editFields });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id);
  };


  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
        case 'assigned':
        return 'bg-gray-200 text-gray-800';
        case 'working':
        return 'bg-red-200 text-red-800';
        case 'completed':
        return 'bg-green-200 text-green-800';
        default:
        return 'bg-gray-200 text-gray-800'; // fallback
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editFields.name}
            onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
            className="mb-2 p-2 border w-full rounded"
            placeholder="Name"
          />
          <input
            type="text"
            value={editFields.title}
            onChange={(e) => setEditFields({ ...editFields, title: e.target.value })}
            className="mb-2 p-2 border w-full rounded"
            placeholder="Title"
          />
          <textarea
            value={editFields.description}
            onChange={(e) => setEditFields({ ...editFields, description: e.target.value })}
            className="mb-2 p-2 border w-full rounded"
            placeholder="Description"
          />
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-3 py-1 rounded text-sm">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={`text-lg mb-2 px-2 py-1 border rounded-xl text-center ${getStatusStyles(task.status)}`}>
            {task.status}
          </p>
          <p className="text-2xl text-blue-700">{task.name}</p>
          <p className="text-lg font-bold">{task.title}</p>
          <p className="text-lg mb-2">{task.description}</p>
          <div className="flex justify-between">
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 px-5 py-1 border rounded-xl text-bold text-lg"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-orange-500 px-5 border rounded-xl text-bold text-lg"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;