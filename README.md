# Monorepo for Task/Activity Manager

This repository houses a Task/Activity Manager application, employing a range of technologies to create a comprehensive platform for managing tasks and activities.

## Technologies Used

### Frontend

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

### Backend

- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.

### Database

- [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
- [Docker](https://www.docker.com/) - A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
- [Docker Compose](https://docs.docker.com/compose/) - A tool for defining and running multi-container Docker applications.

### Common

- [Vite](https://vitejs.dev/) - A new breed of frontend build tool that significantly improves the frontend development experience.
- [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.

## Application Requirements

### Views and Functionality

#### **Main View / Dashboard**

- Overview information such as current tasks, weekly performance, and notifications.

#### **Tasks**

- A user interface to view, add, remove, or edit tasks.
  - Features should include sorting, filtering (e.g., by related activity), and pagination.

#### **Activities**

- A user interface to view, add, remove, or edit activities.
  - Similar functionalities as tasks, ensuring consistency in user interaction.

#### **Statistics / Analytics**

- Displays charts or diagrams to track the progression of tasks and activities over time.
  - Example: Visualizing the completion of tasks and activities in the last month.

## Advanced Functionalities

### Dynamic User Interactions

#### **Data Management**

- **Sorting & Filtering**:
  - Lists and collections within the application allow for dynamic sorting and filtering.
  - **Example**: Users can filter tasks related to specific activities, enhancing usability and navigation.

### Form Simulation for Task & Activity Management

- **Realistic Data Entry**:
  - Task and Activity creation processes incorporate or simulate form-based inputs to ensure user-friendly data entry interfaces.

### Testing Strategy

- **Comprehensive Coverage**:
  - Tests are designed to cover essential features and functionalities, ensuring robustness and reliability of the application.

## Development

#### Docker

To run our applications, use the provided `start-service.sh` script:

```bash
./start-service.sh
```

> **Note**: This script requires Docker commands to be run without `sudo`. Ensure your user is in the `docker` group or use `sudo` to execute the script.

---

### For more detailed documentation, refer to the respective section in the repository:

- **[Server Implementation](docs/server/server-usage.md)**
- **[Client Application Details](docs/client/application-usage.md)**
- **[Database Usage](docs/database/database-usage.md)**
