# Cube.js lab/local development environment

This folder stores all the needed components to run the Cube.js containers locally and give instrunctions on how will the Cube.js development happen from now on.

## Requirements

In order to run these locally, one needs to have how to properly populate the `.env` file with information. Keep in mind that the same file will be used to run the tests.

Also, you need [docker-compose](https://docs.docker.com/compose/install/) installed and set up your environment to run the [tests](https://github.com/Asmartment/company-data-warehouse/tree/master/tests).

## Overview

The run-through of a development of any new feature/bug fix for the Cube.js instance for company would be:

- Creating a new local branch with the Jira ticket code on it
- Running Cube locally 
- Commit and push all changes into this branch (making it remote)
- Run the test for every Cube payload - also create a test function if it is a new payload
- Create a pull request
- Run the code that sends your local schema files to the EC2 instance that contains the QA cube.js instance (while we still do not have a CI/CD process)

### Creating a branch

To create a local branch and switching to it automatically, run the following in your terminal:

```bash
git checkout -b <branch-name>
```

Keep in mind that the branch must have the Jira ticket at the beginning of the branch name, as in the following example:

```
QRPT-269-code-check-automation
```

This ensures that the branch will be linked to the Jira board and makes it easier to track it.

### Running Cube locally

To run the Cube instance locally, you move to this specific directory and run the following command:

```bash
docker-compose up
```

When you do it, you can access the Cube.js UI through `http://localhost:4000/`, being able to access all the schemas and database connections. When you are done with the testing/changes, run:

```bash
docker-compose down
```

### Commiting and pushing changes

To commit and push your changes, run the following commands:

```bash
git add <files-changed-name>
git commit -m <message-description>
git push origin <branch-name>
```

Make sure you do not commit and push directly to master.

### Running the tests

The [tests documentation](https://github.com/Asmartment/company-data-warehouse/tree/master/tests) does a good job explaining what is needed to run tests. In addition, if you just want to run the tests that are present in a specific class or in specific functions, you run the following code:

```bash
python -m pytest -k <class-or-function-name>
```

Take into account that we should make the test be as broad as possible, but for instance, if we just want to test the DH metrics, we can use the class name `vendor_nameReports`, which contain all its tests. Only when all tests are marked as `PASSED` the branch is good to be merged.

### Creating a pull request

Through the GitHub UI there is the option `Pull Request` in which you can choose a specific branch to merge with master. This is a good practice because someone else will be able to review the changes.

## Pushing the changes to the QA environment (EC2)

After all the previous steps are completed, the code can also be tested in the QA environment. First, run the following snippets on the terminal:

```bash
ssh -i <instance-keypair> ec2-user@<instance-ip>
rm -r ~/cube-dev-company/schema/ -f
```

Then, open a new terminal window and copy the updated files:

```bash
scp -i <instance-keypair> -r <repository-location>/company-data-warehouse/CubeJS/schema ec2-user@<instance-ip>:~/cube-dev-company/
```
