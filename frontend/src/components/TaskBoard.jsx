import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphQLClient } from '../lib/graphqlClient';
import { GET_TASKS } from '../graphql/queries';
import { UPDATE_TASK } from '../graphql/mutations';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal';

const statusOrder = ['ASSIGNED', 'WORKING', 'COMPLETED'];

const fetchTasks = async () => {
  const data = await graphQLClient.request(GET_TASKS);
  return data.getTasks;
};

const TaskBoard = () => {
  const { data: tasks = [], isLoading } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const updateTask = useMutation({
    mutationFn: (variables) => graphQLClient.request(UPDATE_TASK, variables),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const grouped = useMemo(() => ({
    ASSIGNED: filteredTasks.filter((t) => t.status === 'ASSIGNED'),
    WORKING: filteredTasks.filter((t) => t.status === 'WORKING'),
    COMPLETED: filteredTasks.filter((t) => t.status === 'COMPLETED'),
  }), [filteredTasks]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    updateTask.mutate({ id: parseInt(draggableId), status: destination.droppableId });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/2"
        />
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Create Task
        </button>
      </div>

      {isLoading ? (
        <div className="text-center mt-10">Loading tasks...</div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statusOrder.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 rounded p-4 min-h-[300px]"
                  >
                    <h2 className="text-lg font-bold mb-2">{status}</h2>
                    {grouped[status].map((task, index) => (
                      <Draggable draggableId={String(task.id)} index={index} key={task.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3">
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {showModal && <CreateTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TaskBoard;
