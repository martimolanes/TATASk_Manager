# Front End

The front end of the application is built using React and vite with TypeScript. This side of the application is responsible for rendering the user interface and handling user interactions. It is also resposible for making HTTP requests to the back end to fetch activities and task data.

TATASk manager application was built by using a lot of different tools and libraries. Below is a list of tools and libraries used to build the front end of the application.

Tools used to build the front end:

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios

Libraries used to build the front end:

- react
- react-router-dom
- framer-motion
- fortawesome/react-fontawesome
- fortawesome/free-solid-svg-icons
- react-chartjs-2
- chart.js

## Routes

The application is made from multiple routes. Such as:

```swift
App Routes
│
├── /
│   └── Welcomes users with an introductory overview.
│
├── /Dashboard
│   ├── Overview of the entire application.
│   │
│   ├── /Tasks
│   │   └── Manages tasks
│   │
│   ├── /Activities
│   │   └── Tracks user activities
│   │
│   └── /Statistics
│       └── Displays data through charts and graphs.

```

The application provides a user-friendly interface across all pages, with the exception of the Landing page. This design facilitates user interaction and task management, thanks to its clear visuals. Furthermore, the Statistics page enhances user understanding by visually representing data through charts.

## Further Documentation

Explore more about the application's front-end architecture and features through the following resources:

- **[Application Components](./application-components.md)**: Details the reusable UI components.
- **[Application Context and Data](./application-context-data.md)**: Explains the context setup and data management strategy.
- **[Application Routes](./application-routes.md)**: Provides a detailed breakdown of the routing architecture.

Each document is designed to give you a deeper understanding of specific aspects of the front end, ensuring you have all the necessary information for development or modification purposes.
