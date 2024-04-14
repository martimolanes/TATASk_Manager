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
  const { activities, deleteActivity, editActivity } = useData();
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
              // Assuming editActivity is already implemented in your useData hook
              editActivity(currentActivity);
              setIsEditing(false);
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                value={currentActivity.name}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    name: e.target.value,
                  })
                }
                onFocus={(e) => e.target.select()}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={currentActivity.activityType}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    activityType: e.target.value,
                  })
                }
              >
                <option value="Job">Job</option>
                <option value="School">School</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            {/* Start Date */}
            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={currentActivity.startDate}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    startDate: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={currentActivity.endDate || ""}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    endDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Activities</h2>
        <div className="flex flex-col w-full">
          <div className="flex bg-gray-200 text-gray-600 uppercase text-sm leading-normal p-4">
            <div className="flex-1">Name</div>
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
                <div className="flex-1">{activity.name}</div>
                <div className="flex-1">{activity.activityType}</div>
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
        {/* Form for adding or editing an activity */}
        <div className="mt-4">{/* ... Your form inputs and buttons ... */}</div>
      </div>
    </>
  );
};

export default Activities;
