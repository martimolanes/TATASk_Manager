import React, { useContext, useState, useEffect, MouseEvent } from "react";
import { Tag, Task, useData } from "../context/DataContext";
import { TabContext } from "../context/TabContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
      className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center p-4"
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

const Tabs = () => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const tabs = ["All Tasks", "Planning", "On Going", "Completed"];
  return (
    <div className="flex space-x-2 mb-4 pl-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-3 rounded-b-lg ${
            activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
          } hover:shadow-xl`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const TagSelector = ({
  availableTags,
  selectedTags,
  onSelectTag,
  onCreateTag,
}: {
  availableTags: Tag[];
  selectedTags: number[];
  onSelectTag: (tagId: number) => void;
  onCreateTag: (tag: Tag) => void;
}) => {
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#000000"); // Default color

  const handleCreateTag = () => {
    onCreateTag({ name: newTagName, color: newTagColor, id: -1 });
    setNewTagName("");
    setNewTagColor("#000000"); // Reset to default after creation
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {availableTags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => onSelectTag(tag.id)}
            className={`m-1 px-2 py-1 rounded-full text-xs font-medium leading-none ${
              selectedTags.includes(tag.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {tag.name} {selectedTags.includes(tag.id) ? "✓" : "+"}
          </button>
        ))}
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New tag name"
          className="text-sm p-1 border rounded"
        />
        <input
          type="color"
          value={newTagColor}
          onChange={(e) => setNewTagColor(e.target.value)}
          className="ml-2 w-6 h-6 border-none rounded"
        />
        <button
          type="button"
          onClick={handleCreateTag}
          className="ml-2 px-2 py-1 bg-green-500 text-white rounded text-xs"
        >
          Create Tag
        </button>
      </div>
    </div>
  );
};

const Tasks = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    tags,
    addTag,
    activities,
    loading,
  } = useData();
  const { activeTab } = useContext(TabContext);
  const [currentTask, setCurrentTask] = useState<Task | {}>({});
  const [editMode, setEditMode] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[] | []>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [activityFilter, setActivityFilter] = useState("");
  const [, setLinksToActivities] = useState<Task[] | []>([]);

  const handleActivityFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivityFilter(event.target.value);
  };

  const handleLinkToActivity = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const activityId = event.target.value;
    setCurrentTask((prevTask) => {
      if (!prevTask) return null;
      return {
        ...prevTask,
        activityid: activityId !== "null" ? parseInt(activityId) : null,
      };
    });
  };

  useEffect(() => {
    const now = new Date();
    const filtered = tasks.filter((task) => {
      const startDate = new Date(task.startDate);
      const endDate = task.endDate ? new Date(task.endDate) : null;

      // Check if the task matches the activity filter
      let matchesActivityFilter = false;
      if (
        activityFilter === "unlinked" &&
        (task.activityid === undefined || task.activityid === null)
      ) {
        matchesActivityFilter = true;
      } else if (
        parseInt(activityFilter) > 0 &&
        task.activityid === parseInt(activityFilter)
      ) {
        matchesActivityFilter = true;
      } else if (!activityFilter) {
        matchesActivityFilter = true; // No activity filter applied
      }

      // Check if the task matches the tab filter
      let matchesTabFilter = false;
      switch (activeTab) {
        case "Planning":
          matchesTabFilter = startDate > now;
          break;
        case "On Going":
          matchesTabFilter = startDate <= now && (!endDate || endDate >= now);
          break;
        case "Completed":
          matchesTabFilter = endDate !== null && endDate < now;
          break;
        default:
          matchesTabFilter = true; // No tab filter applied or all tasks
          break;
      }

      return matchesActivityFilter && matchesTabFilter;
    });

    setFilteredTasks(filtered as Task[]);
    setLinksToActivities(filtered as Task[]);
  }, [tasks, activeTab, activityFilter]);

  const handleNewTask = () => {
    setCurrentTask({
      name: "",
      content: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      Tags: [],
      id: undefined,
    });
    setEditMode(true);
  };
  const handleEditTask = (task: Task) => {
    setCurrentTask({
      ...task,
      startDate: task.startDate.split("T")[0],
      endDate: task.endDate ? task.endDate.split("T")[0] : "",
    });
    console.log("editing");
    setSelectedTags(task.Tags.map((tag) => tag.id));
    setEditMode(true);
  };

  const toggleTagSelection = (tagId: number) => {
    setSelectedTags((prev: number[]) => {
      const currentIndex = prev.indexOf(tagId);
      const newSelectedTags = [...prev];

      if (currentIndex === -1) {
        newSelectedTags.push(tagId);
      } else {
        newSelectedTags.splice(currentIndex, 1);
      }

      return newSelectedTags;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskWithTags: Task | {} = {
      ...currentTask,
      Tags: tags.filter((tag: Tag) => selectedTags.includes(tag.id)),
    };
    if ((taskWithTags as Task).id) {
      await updateTask(taskWithTags as Task);
    } else {
      await addTask(taskWithTags as Task);
    }
    console.log("submitting");
    setEditMode(false);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
  };

  const getTaskColor = (task: Task) => {
    const now = new Date();
    const startDate = new Date(task.startDate);
    const endDate = task.endDate ? new Date(task.endDate) : null;
    if (endDate && endDate < now) {
      return "bg-green-200";
    } else if (startDate > now) {
      return "bg-blue-200";
    } else {
      return "bg-yellow-200";
    }
  };
  const getActivityTitleById = (activityid: number) => {
    const activity = activities.find((act) => act.id === activityid);
    return activity ? activity.title : "No linked activity";
  };

  const createTag = (tag: Tag) => {
    addTag({ ...tag, id: Math.floor(Math.random() * 1000) });
  };

  const hexToRGBA = (hex: string, opacity: number) => {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const renderTags = (task: Task) => {
    if (task.Tags.length === 0) {
      return (
        <div className="absolute top-2 right-2">
          <button
            onClick={() => handleEditTask(task)}
            className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-800 bg-gray-300 bg-opacity-75 rounded-full whitespace-nowrap"
          >
            Add Tag
          </button>
        </div>
      );
    }

    return (
      <div className="absolute top-2 right-2 flex flex-col items-start">
        {task.Tags.map((tag, index) => (
          <span
            key={index}
            style={{ backgroundColor: hexToRGBA(tag.color, 0.8) }}
            className="mb-1 last:mb-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Tabs />
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <>
          <Modal isOpen={editMode} onClose={() => setEditMode(false)}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={
                    currentTask && "name" in currentTask ? currentTask.name : ""
                  }
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, name: e.target.value })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={
                    currentTask && "content" in currentTask
                      ? currentTask.content
                      : ""
                  }
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, content: e.target.value })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                />
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
                  id="startDate"
                  value={
                    currentTask && "startDate" in currentTask
                      ? currentTask.startDate
                      : ""
                  }
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      startDate: e.target.value,
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                  id="endDate"
                  value={
                    currentTask && "endDate" in currentTask
                      ? currentTask.endDate
                      : ""
                  }
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, endDate: e.target.value })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="activityFilter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link to Activity
                </label>
                <select
                  id="activityFilter"
                  value={(currentTask as Task)?.activityid || "null"} // Reflect the current state
                  onChange={handleLinkToActivity}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="null">No link</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <TagSelector
                  availableTags={tags}
                  selectedTags={selectedTags}
                  onSelectTag={toggleTagSelection}
                  onCreateTag={createTag} // Passing the new tag creation handler
                />
              </div>
              <div className="flex items-center justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
          <div className="mb-8, ml-8">
            <label
              htmlFor="activityFilter"
              className="block text-sm font-medium text-gray-700 ml-4"
            >
              Filter by Activity
            </label>
            <select
              id="activityFilter"
              value={activityFilter}
              onChange={handleActivityFilterChange}
              className="mt-1 ml-4 block w-20% pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Tasks</option>
              <option value="unlinked">Tasks without Activity</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.title}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 ml-8">Tasks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-8">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`relative shadow rounded-lg p-4 ${getTaskColor(
                    task
                  )}`}
                >
                  <div className="absolute top-2 right-2 flex flex-wrap">
                    {renderTags(task)}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{task.name}</h3>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(task.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {task.endDate
                      ? new Date(task.endDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {task.activityid && (
                    <p>
                      <strong>Activity:</strong>{" "}
                      {getActivityTitleById(task.activityid)}
                    </p>
                  )}
                  <div className="mt-4">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="mx-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id!)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleNewTask}
                className="relative shadow rounded-lg p-4 bg-gray-300 hover:bg-gray-400 text-white font-bold w-48 h-48 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPlus} size="3x" className="m-auto" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Tasks;
