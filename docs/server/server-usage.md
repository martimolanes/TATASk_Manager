# Server Usage Overview

## Server Architecture

The server side of our application is structured for effective data handling and API management, facilitating robust communication between the frontend and the database.

**Directory Structure:**

```
server/
├── build/
├── src/
│   ├── config/
│   ├── models/
│   └── routes/
└── test-api/
    ├── Activity/
    ├── environments/
    ├── Tag/
    └── Task/
```

## Main Components

### Configuration and Models

- **Database Connection (`db.ts`)**: Configures and initiates the connection to PostgreSQL using Sequelize, with environment variables for secure management of credentials.
- **Models**: Outline the database structure and relationships, incorporating models such as `Activity`, `Task`, `Tag`, `ActivityTag`, `TaskTag`, and others.

### Routes

- **Task Routes (`task.ts`)**: Manages CRUD operations for tasks, integrating tasks with tags through a junction table.
- **Activity Routes (`activity.ts`)**: Administers the lifecycle of activities and their associations with types, statuses, and tags.
- **Tag Routes (`tag.ts`)**: Offers endpoints for tag creation and retrieval.

### API Testing

- **Test API**: Includes collections for testing API endpoints to verify their functionality, ideally through tools like Bruno (Postman).

## Running the Server

- **Start Command**: Navigate to the `server/` directory and run the following command to start the development server:
  ```lua
  cd server/
  bun run dev
  ```
  This utilizes Bun to run the server, capitalizing on its efficiency and performance advantages.

## Conclusion

Our server setup is meticulously designed to be robust and scalable, ensuring efficient and secure data management. It is well-prepared to support various client applications and can be extended to meet future requirements as necessary.
