This is a monorepo that aims deploying a Task/Activity manager using the following technologies:
### Frontend
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

### Database
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Common
- [Vite](https://vitejs.dev/)
- [Bun](https://bun.sh/)
- [TypeScript](https://www.typescriptlang.org/)
> For testing, we are using bun test, which is jest compatible syntax.

## Aplication Requirements

Views

    Main view / Dashboard
        View that contains overview information (e.g. current tasks, weekly performance, notifications)
    Tasks 
        View where user can view and manage existing tasks (e.g. list or similar)
            Add/Remove/Edit
    Activities
        View where user can view and manage existing activities (e.g. list or similar)
            Add/Remove/Edit
    Statistics / Analytics
        Charts / Diagrams that show the progression of tasks and activities
            e.g. how many tasks/activites have been completed during last month

Lists or similar collections should allow sorting and filtering of data

    e.g. User should be able to search task belonging to specific activity

List should use pagination
Task/Activity creation should either use or simulate forms
Tests should cover important features and areas 

    Additional information regarding of how to write tests will be provided later
