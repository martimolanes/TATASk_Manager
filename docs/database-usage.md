### Running Your Docker Compose Setup

When you have your `postgres.yml` properly set up, this file should define your PostgreSQL and Adminer services. Here’s a quick recap of what happens when you run it:

1. **Starting Docker Compose**:
   - Docker Compose reads your configuration file and starts the defined services. In our case, it will start the PostgreSQL database server and the Adminer interface.

2. **What Happens**:
   - **PostgreSQL Container**: The PostgreSQL server starts. If it’s the first time you’re running this setup and you’ve configured an SQL script to run at startup, it will execute that script, creating your schema and inserting any predefined data.
   - **Adminer Container**: The Adminer web interface becomes available. You can use Adminer to manage your PostgreSQL database through a web browser.

### Accessing the Data

- **Through Adminer**:
  - Open a web browser and navigate to `http://localhost:9999`.
  - Log in with the PostgreSQL credentials defined in your `postgres.yml`.
  - According to your postgres.yml file, the credentials should be:

    -  System: `PostgreSQL`
    -  Server: `db`
    -  Username: `postgres` (the default superuser account created by the PostgreSQL Docker image)
    -  Password: `example` (as you've specified in your postgres.yml)
    -  Database: You can leave this blank initially to log into the PostgreSQL server itself.


- **Using PostgreSQL in the Terminal**:
  - To interact with PostgreSQL through the terminal, you'll first access the terminal of your PostgreSQL Docker container:
    ```bash
    docker exec -it <container_name_or_id> bash
    ```
    Replace `<container_name_or_id>` with the name or ID of your PostgreSQL Docker container. If you're unsure of the container's name or ID, use `docker ps` to list all running containers.
  - Once inside the container, connect to the PostgreSQL database using `psql`:
    ```bash
    psql -U postgres
    ```
    Here, `postgres` is the default username. If you've created a specific database and want to connect directly to it, you can use `-d database_name` with the command.
  - **Interacting with PostgreSQL**:
    - You are now connected to the PostgreSQL command-line interface (CLI) and can execute SQL commands.
    - To list all databases, use: `\l`
    - To connect to a specific database, use: `\c database_name`
    - To list all tables in the current database, use: `\dt`
    - To run any SQL query, simply type it and end with a semicolon. For example, to select everything from a `Task` table:
      ```sql
      SELECT * FROM Task;
      ```
    - To exit `psql`, type: `\q`

### Documentation and Tips

- **Backups**: Consider setting up backup strategies for your PostgreSQL data, especially if you're using it for important or production data.
- **Persistence**: To ensure your data persists between container restarts, make sure to configure volumes in your Docker Compose file for the PostgreSQL service.
- **Security**: Avoid using default passwords or exposing the database publicly without proper security measures in place, especially in production environments.
