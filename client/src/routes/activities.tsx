import React, { useState } from "react";
import { useData, Activity } from "../context/DataContext";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full">
        <button className="float-right text-xl font-semibold" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const Activities = () => {
  const { activities, deleteActivity, updateActivity } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  const handleDeleteActivity = (activityId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (isConfirmed) {
      deleteActivity(activityId);
    }
  };

  const handleEditActivity = (activity: Activity) => {
    setCurrentActivity(activity);
    setIsEditing(true);
  };

  return (
    <>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        {currentActivity && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!currentActivity) return;
              updateActivity(currentActivity);
              setIsEditing(false);
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                value={currentActivity.title}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    title: e.target.value,
                  })
                }
                onFocus={(e) => e.target.select()}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="activityType"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="activityType"
                name="activityType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={currentActivity.activityType.name}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    activityType: {
                      ...currentActivity.activityType,
                      name: e.target.value,
                    },
                  })
                }
              >
                {/* Populate with dynamic types if needed */}
                <option value="Job">Job</option>
                <option value="School">School</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            {/* Similar changes for startDate, endDate, etc., ensuring all are mapped correctly */}
          </form>
        )}
      </Modal>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Activities</h2>
        <div className="flex flex-col w-full">
          <div className="flex bg-gray-200 text-gray-600 uppercase text-sm leading-normal p-4">
            <div className="flex-1">Title</div>
            <div className="flex-1">Type</div>
            <div className="flex-1">Start Date</div>
            <div className="flex-1">End Date</div>
            <div className="flex-1 text-center">Actions</div>
          </div>
          <div className="flex flex-col text-gray-600 text-sm font-light">
            {activities.map((activity) => (
              <div
                className="flex border-b border-gray-200 hover:bg-gray-100 p-4"
                key={activity.id}
              >
                <div className="flex-1">{activity.title}</div>
                <div className="flex-1">{activity.activityType.name}</div>
                <div className="flex-1">{activity.startDate}</div>
                <div className="flex-1">{activity.endDate || "Ongoing"}</div>
                <div className="flex-1 flex justify-center">
                  <button
                    onClick={() => handleEditActivity(activity)}
                    className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activities;
