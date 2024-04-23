import React, { useState, MouseEvent } from "react";
import { useData, Activity } from "../context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

// Assume the default start date is today for new activities
const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

const initialNewActivity: Activity = {
  title: "test title",
  description: "test description",
  url: "",
  startDate: today,
  endDate: today,
  ActivityType: {
    name: "Exercise",
  },
  Status: {
    title: "Ongoing",
    style: "#20B2AA",
  },
  Tags: [],
};

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

  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "modal-backdrop") {
      console.log("closing");
      onClose();
    }
    console.log("closing2");
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full z-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="float-right text-xl font-semibold" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
const Activities = () => {
  const { activities, deleteActivity, updateActivity, addActivity, loading } =
    useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isViewing, setIsViewing] = useState(false);

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsViewing(true); // Open the modal in view mode
  };

  const handleClose = () => {
    setIsViewing(false);
    setSelectedActivity(null); // Clear selection on close
  };

  const handleDeleteActivity = (activityId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (isConfirmed) {
      deleteActivity(activityId);
    }
  };

  const handleEditActivity = (activity: Activity) => {
    setCurrentActivity({
      ...activity,
      ActivityType: { ...activity.ActivityType },
      startDate: activity.startDate.split("T")[0],
      endDate: activity.endDate ? activity.endDate.split("T")[0] : "",
    });
    setIsEditing(true);
    setIsNew(false);
  };

  const handleNewActivity = () => {
    setCurrentActivity(initialNewActivity);
    setIsEditing(true);
    setIsNew(true);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (currentActivity) {
      console.log("Submitting...", currentActivity);
      if (isNew) {
        console.log("Adding new activity...", currentActivity);
        await addActivity(currentActivity);
      } else {
        await updateActivity(currentActivity);
      }
      setIsEditing(false);
    }
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    activity: Activity
  ) => {
    event.stopPropagation(); // Prevent event from bubbling up to the parent onClick
    handleEditActivity(activity);
  };

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    activityId: number
  ) => {
    event.stopPropagation(); // Prevent event from bubbling up to the parent onClick
    handleDeleteActivity(activityId);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Modal isOpen={isViewing} onClose={handleClose}>
        {selectedActivity && (
          <div>
            <h3>Title: {selectedActivity.title}</h3>
            <p>Description: {selectedActivity.description}</p>
            <p>Type: {selectedActivity.ActivityType.name}</p>
            <p>Start Date: {formatDate(selectedActivity.startDate)}</p>
            <p>
              End Date:{" "}
              {selectedActivity.endDate
                ? formatDate(selectedActivity.endDate)
                : "Ongoing"}
            </p>
          </div>
        )}
      </Modal>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        {currentActivity && (
          <form onSubmit={handleSubmit}>
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
                  setCurrentActivity((prev) => {
                    if (prev === null) return null;
                    return {
                      ...prev,
                      title: e.target.value,
                    };
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                value={currentActivity.description}
                onChange={(e) =>
                  setCurrentActivity((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      description: e.target.value,
                    };
                  })
                }
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ActivityType"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <input
                type="text"
                id="ActivityType"
                name="ActivityType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                value={currentActivity.ActivityType.name}
                onChange={(e) =>
                  setCurrentActivity((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      ActivityType: {
                        ...prev.ActivityType,
                        name: e.target.value,
                      },
                    };
                  })
                }
              ></input>
            </div>
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                value={currentActivity.startDate.split("T")[0]} // Assuming the date comes in ISO format
                onChange={(e) =>
                  setCurrentActivity((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      startDate: e.target.value,
                    };
                  })
                }
                required
              />
            </div>
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                value={
                  currentActivity.endDate
                    ? currentActivity.endDate.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setCurrentActivity((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      endDate: e.target.value,
                    };
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </form>
        )}
      </Modal>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 ml-4">Activities</h2>
        <div className="flex items-center mb-4 ml-4">
          <button
            onClick={handleNewActivity}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center mr-4 w-42"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create New Activity
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded shadow-sm bg-white focus:border-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </div>
          </div>
        </div>
        <div className="flex flex-col m-4">
          {activities
            .filter((activity) =>
              activity.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((activity, index) => (
              <div
                className={`flex border-b border-gray-200 hover:bg-gray-100 p-4 ${
                  selectedActivity?.id === activity.id ? "bg-green-100" : ""
                }`}
                key={activity.id + "-" + index}
                onClick={() => handleActivitySelect(activity)}
              >
                <div className="flex-1">{activity.title}</div>
                <div className="flex-1">
                  {activity.ActivityType ? activity.ActivityType.name : "N/A"}
                </div>
                <div className="flex-1">{formatDate(activity.startDate)}</div>
                <div className="flex-1">
                  {formatDate(activity.endDate) || "Ongoing"}
                </div>
                <div className="flex-1">{getStatus(activity)}</div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={(e) => handleEditClick(e, activity)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(e, activity.id || -1)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

function getStatus(activity: Activity) {
  const today = new Date();
  const startDate = new Date(activity.startDate);
  const endDate = new Date(activity.endDate);
  console.log("today", today);
  console.log("startDate", startDate);
  console.log("endDate", endDate);

  if (startDate > today) {
    return "Upcoming";
  } else if (endDate && endDate < today) {
    return "Past";
  } else {
    return "Ongoing";
  }
}

export default Activities;
