# Context Documentation

## Overview

This documentation provides a detailed description of the context and hooks used in our React application to manage the state related to tasks, activities, and tags. The structure facilitates easy access and manipulation of state across different components.

## Directory Structure

```
context/
├── DataContext.tsx
├── hooks/
│   ├── useActivities.tsx
│   ├── useTags.tsx
│   └── useTasks.tsx
└── TabContext.tsx
```

## DataContext.tsx

### Purpose

`DataContext` serves as the central hub for managing state related to tasks, activities, and tags. It uses custom hooks to provide and manipulate data.

### Components

- `DataProvider`: Wraps child components to provide them access to data-related state and functions.
- `useData`: Custom hook to access the context data.

### Types

- `Task`: Represents a task with properties such as id, name, content, start and end dates, and associated tags.
- `Activity`: Describes an activity with properties including title, description, URLs, dates, and related tags.
- `Tag`: Defines a tag with id, name, and color.

### Functions

- Task management: `addTask`, `updateTask`, `deleteTask`
- Activity management: `addActivity`, `updateActivity`, `deleteActivity`
- Tag management: `addTag`

## TabContext.tsx

### Purpose

Manages the state of the active tab in the user interface to control the visible content based on user interaction.

### Components

- `TabProvider`: Provides the active tab state to its child components.

### Usage

Utilize `TabContext` to switch between different views like "All Tasks", "Completed Tasks", etc.

## Hooks

### useActivities

Manages activities including fetching, adding, updating, and deleting activities. Handles loading and error states.

### useTags

Manages tags similarly, with functions to fetch, add, and manage error and loading states.

### useTasks

Handles tasks' state with capabilities to fetch, add, update, and delete tasks, along with managing loading and error information.

## Usage Example

To use these contexts and hooks, wrap your component tree with `DataProvider` and `TabProvider` as needed, and use the respective hooks in your components to access and manipulate the state.

```jsx
import { DataProvider, useData } from "./context/DataContext";
import { TabProvider } from "./context/TabContext";

function App() {
  return (
    <DataProvider>
      <TabProvider>
        <YourComponent />
      </TabProvider>
    </DataProvider>
  );
}

function YourComponent() {
  const { tasks, addTask } = useData();
  // Component logic
}
```

## Conclusion

This structure provides a robust and scalable way to manage and distribute state across your React application, ensuring components have the necessary data to function properly without prop-drilling or unnecessary re-renders.
