# Database Configuration Overview

## PostgreSQL with Docker

This setup utilizes Docker to run PostgreSQL and Adminer services, ensuring quick deployment and easy management of your database.

### Services Configured:

- **PostgreSQL**: The primary database service.

  - **Port**: 5432
  - **Environment**: Uses `example` as the default password.
  - **Volume**: Initializes the database with an SQL schema from `./init-db.sql`.

- **Adminer**: A web-based database management tool.
  - **Port**: Accessible on localhost at port 9999, maps to 8080 in the container.

## Getting Started

To launch the services, navigate to the `database/` directory and run:

```bash
docker-compose -f postgres.yml up
```

This command starts both PostgreSQL and Adminer, making them ready for use.

For a comprehensive guide on utilizing and managing this database setup, including details on schema operations and best practices:

- **[Database Usage Documentation](../docs/database/database-usage.md)**: Delve into detailed usage scenarios, configuration tips, and more.
