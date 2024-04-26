# Application Routes Documentation

## Overview

This documentation outlines the specific functionalities and interfaces provided by the route components in our React application. Each route corresponds to a particular view within the application, handling distinct aspects like dashboard metrics, task management, activity tracking, and data visualization.

## Directory Structure

```
src/routes/
├── activities.tsx
├── dashboard.tsx
├── statistics.tsx
└── tasks.tsx
```

## Routes Description

### `dashboard.tsx`

#### Description

Serves as the home page of the application, displaying an overview of tasks and activities. It provides a quick summary of the overall status of tasks and activities, including counts of total, pending, and completed items.

#### Key Features

- **Tasks Overview**: Displays total, completed, and pending tasks.
- **Activities Overview**: Shows counts of upcoming and past activities.
- **Progress Bars**: Visual progress indicators for tasks and activities completion.

### `tasks.tsx`

#### Description

Handles task management functionalities including adding, editing, and deleting tasks. It integrates with the `TabContext` to allow users to view tasks based on their status (e.g., Planning, Ongoing, Completed).

#### Key Features

- **Task Management**: Create, update, and delete tasks.
- **Tag Management**: Add tags to tasks for better organization.
- **Filter by Activity**: Users can filter tasks linked to specific activities.
- **Custom Modals**: Utilize modals for editing and adding tasks.

### `activities.tsx`

#### Description

Manages all activity-related interactions such as creating, viewing, editing, and deleting activities. It includes modal components for both viewing detailed activity information and editing or adding new activities.

#### Key Features

- **Create Activities**: Allows users to add new activities.
- **Edit Activities**: Users can modify existing activities.
- **Delete Activities**: Provides functionality to remove activities.
- **Search and Filter**: Includes a search functionality to find activities quickly.

### `statistics.tsx`

#### Description

Presents statistical data through visual charts, offering insights into the tasks and activities managed within the application. It utilizes bar and pie charts to represent data proportionally.

#### Key Features

- **Task Statistics**: Bar chart displaying the breakdown of total, completed, and ongoing tasks.
- **Activity Statistics**: Pie chart showing the ratio of completed to total activities.
- **Responsive Design**: Charts adjust to screen size for optimal viewing.

## Usage Example

To navigate between these routes, ensure your routing setup (e.g., using React Router) is configured to link each path to the corresponding component. Here is an example snippet from a possible routing setup:

```jsx
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Activities from "./routes/activities";
import Dashboard from "./routes/dashboard";
import Statistics from "./routes/statistics";
import Tasks from "./routes/tasks";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/activities" component={Activities} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/tasks" component={Tasks} />
      </Switch>
    </Router>
  );
}
```

## Conclusion

Each route is designed to handle specific aspects of the application, providing a clean and intuitive interface for managing tasks, activities, and viewing statistics. This modularity helps in maintaining the codebase and improving the user experience.
