Task Management API

Welcome to the Task Management API documentation! This API allows users to perform various operations related to task management, such as creating, updating, fetching, and deleting tasks.
Base URL



https://localhost:PORT

Authentication

Some endpoints require administrator authentication.
Endpoints

    Create Task
    Update Task
    Get User Tasks
    Delete Task
    Finish Task

Create Task

Create a new task for a user.

    URL: /task
    Method: POST
    Request Body:

    json

{
  "action": "create",
  "taskAssigned": {
    "title": "string",
    "description": "string",
    "dueDate": "string (YYYY-MM-DD)"
  },
  "username": "string"
}

Response: 201 Created

json

    {
      "message": "Task created for {username}",
      "newTask": {
        "title": "string",
        "description": "string",
        "dueDate": "string (YYYY-MM-DD)",
        "createdAt": "string (timestamp)",
        "completedAt": null
      }
    }

Update Task

Update an existing task.

    URL: /task
    Method: PUT
    Request Body:

    json

{
  "action": "update",
  "taskAssigned": {
    "title": "string",
    "description": "string",
    "dueDate": "string (YYYY-MM-DD)"
  },
  "username": "string"
}

Response: 200 OK

json

    {
      "message": "Task updated for {username}",
      "updatedTask": {
        "title": "string",
        "description": "string",
        "dueDate": "string (YYYY-MM-DD)",
        "createdAt": "string (timestamp)",
        "completedAt": "string (timestamp)"
      }
    }

Get User Tasks

Retrieve tasks associated with a specific user.

    URL: /task
    Method: GET
    Query Parameters:
        username: The username of the user whose tasks to fetch.
    Response: 200 OK

    json

    {
      "tasks": [
        {
          "title": "string",
          "description": "string",
          "dueDate": "string (YYYY-MM-DD)",
          "createdAt": "string (timestamp)",
          "completedAt": "string (timestamp)"
        },
        ...
      ]
    }

Delete Task

Delete a task.

    URL: /task
    Method: DELETE
    Request Body:

    json

{
  "action": "delete",
  "username": "string",
  "taskAssigned": {
    "title": "string"
  }
}

Response: 200 OK

json

    {
      "message": "Task deleted successfully"
    }

Finish Task

Mark a task as completed.

    URL: /task
    Method: PUT
    Request Body:

    json

{
  "action": "finishTask",
  "taskAssigned": {
    "title": "string"
  }
}

Response: 200 OK

json

    {
      message: `Task : ${title} completed at ${completedAt}`
    }

Error Responses

    Status: 400 Bad Request
        Missing required fields in the request body.
    Status: 404 Not Found
        User or task not found.
    Status: 500 Internal Server Error
        Internal server error occurred.