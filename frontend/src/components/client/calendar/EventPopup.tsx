import React, { useState } from 'react';
import { XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { createAxiosInstance } from '../../../context/modules/Interceptor';


interface EventPopupProps {
  event: {
    title: string;
    description: string;
    location: string;
    start: Date;
    end: Date;
    id: string;
  };
  onClose: () => void;
  onEdit: (updatedEvent: {
    title: string;
    description: string;
    location: string;
    start: Date;
    end: Date;
  }) => void;
  onDelete: (id: string) => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const axiosInstance = createAxiosInstance();
    try {
      await axiosInstance.put(
        `http://localhost:5000/api/admin/edit-calendar-items/${editedEvent.id}`,
        {
          title: editedEvent.title,
          description: editedEvent.description,
          location: editedEvent.location,
          start: editedEvent.start,
          end: editedEvent.end,
        }
      );
      onEdit(editedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    onClose()
    const axiosInstance = createAxiosInstance();
    try {
      await axiosInstance.delete(`http://localhost:5000/api/admin/delete-calendar-items/${id}`,
      );
      onDelete(id);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-4 relative border-b">
          {isEditing ? (
            <input
              name="title"
              value={editedEvent.title}
              onChange={handleChange}
              className="text-md font-normal pr-8 w-full"
            />
          ) : (
            <h2 className="text-md font-normal pr-8">{event.title}</h2>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1">Location:</h3>
            {isEditing ? (
              <input
                name="location"
                value={editedEvent.location}
                onChange={handleChange}
                className="text-gray-600 w-full border border-gray-200 outline-none p-2"
              />
            ) : (
              <p className="text-gray-600">{event.location}</p>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1">Time:</h3>
            {isEditing ? (
              <input
                name="start"
                type="time"
                value={editedEvent.start.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                onChange={handleChange}
                className="text-gray-600"
              />
            ) : (
              <p className="text-gray-600">
                {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1">Date:</h3>
            <p className="text-gray-600">{event.start.toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1">Description:</h3>
            {isEditing ? (
              <textarea
                name="description"
                value={editedEvent.description}
                onChange={handleChange}
                className="text-gray-600 w-full border border-gray-200 outline-none p-2"
              />
            ) : (
              <p className="text-gray-600">{event.description}</p>
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center text-xs justify-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-xs justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(event.id)}
            className="flex items-center text-xs justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
