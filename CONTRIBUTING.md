## Collaboration Process

If you are a collaborator on this project, please follow the steps below to contribute to the project:

### 1. Create a New Branch

- Start by creating a new branch for the changes you want to make. You can do this using the following git command:

```bash
git checkout -b branch-name
```

Replace `branch-name` with a name that describes the changes you plan to make.

### 2. Make Your Changes

- Make your changes in the newly created branch. Please ensure that your code adheres to our coding standards and guidelines.

### 3. Commit Your Changes

- After making your changes, you need to commit them. Use the following git commands to add and commit your changes:

```bash
git add .
git commit -m "Commit message"
```

Replace `Commit message` with a brief description of the changes you made.

### 4. Push Your Changes

- Once you've committed your changes, you need to push them to the remote repository. You can do this using the following git command:

```bash
git push origin branch-name
```

Replace `branch-name` with the name of the branch you created earlier.

### 5. Create a Pull Request

- After pushing your changes, go to the GitHub page of the repository and click on `Pull requests`.

- Click on `New pull request`.

- In the `compare` dropdown, select the branch that you pushed.

- Review your changes and then click `Create pull request`.

- Provide a title and description for your pull request, and then click `Create pull request`.

## Code Review

To test a branch locally, you will need to follow these steps:

1. **Fetch the branch:**
    If the branch exists on the remote repository and you don't have it locally, you need to fetch it first. Use the following command:

    ```bash
    git fetch --all --prune
    ```

    This command will fetch all branches from the remote repository.

2. **Switch to the branch:**
    After fetching the branch, you need to switch to it. You can do this using the git checkout command:

    ```bash
    git checkout origin/branch-name
    ```

    Replace `branch-name` with the name of the branch you want to test.

3. **Test the branch:**
    After switching to the branch, you can test it locally to ensure that it works as expected. Or, if you want to make changes to the branch, you can create a new branch from it using the following command:
    ```bash
    git checkout -b branch-name
    ```


4. **Review the changes:**
    While testing, you can also review the changes made in the code. This can be done using the diff command:

    ```bash
    git diff branch-name
    ```
