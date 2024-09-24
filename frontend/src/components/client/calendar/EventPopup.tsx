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
    id: string;
  }) => void;
  onDelete: (id: string) => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEvent(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const axiosInstance = createAxiosInstance();
    try {
      await axiosInstance.put(`http://localhost:5000/api/admin/edit-calendar-items/${editedEvent.id}`, {
        title: editedEvent.title,
        description: editedEvent.description,
        location: editedEvent.location,
        start: editedEvent.start,
        end: editedEvent.end,
      });
      onEdit(editedEvent); // Update the parent component with the edited event
    } catch (error) {
      console.error('Error updating event:', error);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const axiosInstance = createAxiosInstance();
    try {
      await axiosInstance.delete(`http://localhost:5000/api/admin/delete-calendar-items/${event.id}`);
      onDelete(event.id); // Update the parent component by removing the event
      alert('Event deleted successfully');
      onClose();
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
        <div className="px-6 py-4 bg-gray-100 border-t flex justify-between">
          {isEditing ? (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className="h-5 w-5 inline-block" /> Edit
            </button>
          )}
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={handleDelete}
          >
            <TrashIcon className="h-5 w-5 inline-block" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
