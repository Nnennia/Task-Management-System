Task Management API Documentation

This API allows users to manage tasks assigned to them.
Base URL:



http://localhost:{PORT}/task

Endpoints:
Create Task

    URL: /create
    Method: POST
    Description: Creates a new task for a specified user.
    Request Body:

    json

    {
      "action": "create",
      "taskAssigned": {
        "title": "Task Title",
        "description": "Task Description",
        "dueDate": "YYYY-MM-DD",
        "completedAt": null,
        "createdAt": "YYYY-MM-DD"
      },
      "username": "username"
    }

    Response:
        201 Created: Task successfully created.
        400 Bad Request: Missing required fields or invalid request.
        404 Not Found: User not found.
        500 Internal Server Error: Server error.

Update Task

    URL: /update
    Method: POST
    Description: Updates an existing task.
    Request Body:

    json

    {
      "action": "update",
      "taskAssigned": {
        "title": "Task Title",
        "description": "New Task Description",
        "dueDate": "New Due Date"
      },
      "username": "username"
    }

    Response:
        200 OK: Task successfully updated.
        400 Bad Request: Missing required fields or invalid request.
        404 Not Found: Task not found.
        500 Internal Server Error: Server error.

Get User Tasks

    URL: /get
    Method: POST
    Description: Retrieves all tasks associated with a user.
    Request Body:

    json

    {
      "action": "get",
      "username": "username"
    }

    Response:
        200 OK: Tasks successfully retrieved.
        404 Not Found: User not found.
        500 Internal Server Error: Server error.

Delete Task

    URL: /delete
    Method: POST
    Description: Deletes a task assigned to a user.
    Request Body:

    json

    {
      "action": "delete",
      "username": "username",
      "taskAssigned": "Task Title"
    }

    Response:
        200 OK: Task successfully deleted.
        400 Bad Request: Missing required field or invalid request.
        404 Not Found: User or task not found.
        500 Internal Server Error: Server error.

Finish Task

    URL: /finishTask
    Method: POST
    Description: Marks a task as completed.
    Request Body:

    json

    {
      "action": "finishTask",
      "taskAssigned": "Task ID"
    }

    Response:
        200 OK: Task successfully marked as completed.
        404 Not Found: Task not found.
        500 Internal Server Error: Server error.

Error Responses:

    400 Bad Request: Indicates that the request was incorrect or missing required fields.
    404 Not Found: Indicates that the requested resource (user or task) was not found.
    500 Internal Server Error: Indicates a server-side error occurred.