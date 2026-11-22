# Notes Task API

A RESTful Notes Management API built using **Node.js, Express.js, and MongoDB**. It allows users to create, retrieve, update, delete, search, filter, sort, and paginate notes.

This project demonstrates backend development concepts, including CRUD operations, REST API design, input validation, error handling, database integration, and API testing.

## Live Demo

**Base URL:** https://notes-task-api-mfft.onrender.com

**Example:** `https://notes-task-api-mfft.onrender.com/api/notes`

## Features

- Create new notes
- Retrieve all notes
- Retrieve a note by ID
- Update existing notes
- Delete notes
- Search notes by title or content (case-insensitive)
- Filter notes by completion status
- Sort notes by creation date (latest or oldest)
- Pagination with page and limit parameters
- Input validation and error handling
- MongoDB database integration

## Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling tool
- **Postman** – API testing

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Shweta7880/notes-task-api
```

### 2. Navigate to the project directory

```bash
cd notes-tast-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root directory and add:

```env
MONGO_URI=mongodb+srv://notesapi:shweta78.@notestaskcluster.61ddrwv.mongodb.net/
PORT=3000
```

Replace the MongoDB connection string with your own.

**Important:** Never upload your `.env` file or database credentials to GitHub.

### 5. Start the server

```bash
npm start
```

The server will run at:

`http://localhost:3000`

## API Endpoints

Base URL:

`/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes` | Retrieve all notes |
| GET | `/api/notes/:id` | Retrieve a note by ID |
| PUT | `/api/notes/:id` | Update an existing note |
| DELETE | `/api/notes/:id` | Delete a note |

## Example Requests

### 1. Create a Note

**POST** `/api/notes`

Request Body:

```json
{
  "title": "Learn Node.js",
  "content": "Practice Express and MongoDB",
  "completed": false
}
```

### 2. Update a Note

**PUT** `/api/notes/:id`

Request Body:

```json
{
  "title": "Learn Backend Development",
  "content": "Practice Express, MongoDB and REST APIs",
  "completed": true
}
```

### 3. Delete a Note

**DELETE** `/api/notes/:id`

Replace `:id` with the ID of the note you want to delete.

## Search, Filtering, Sorting and Pagination

The API supports query parameters to retrieve notes efficiently.

### Search Notes

Search by title or content (case-insensitive).

```http
GET /api/notes?search=Java
```

### Filter Notes

Retrieve completed or incomplete notes.

```http
GET /api/notes?completed=true
GET /api/notes?completed=false
```

### Sort Notes

Sort notes by creation date.

```http
GET /api/notes?sort=latest
GET /api/notes?sort=oldest
```

### Pagination

Retrieve notes page by page.

```http
GET /api/notes?page=1&limit=5
GET /api/notes?page=2&limit=5
```

The maximum allowed limit is 100 notes per request.

### Combine Query Parameters

Search, filter, sort, and paginate in a single request.

```http
GET /api/notes?search=Java&completed=false&sort=latest&page=1&limit=5
```

## Validation and Error Handling

The API includes validation and error handling for common situations:

- Missing or invalid title and content
- Invalid completion status
- Invalid note IDs
- Notes that do not exist
- Invalid pagination parameters
- Invalid completion filter
- Invalid sorting option
- Search query exceeding 100 characters
- Pagination limit exceeding 100
- Database and server errors

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Note created successfully |
| 400 | Invalid request or input |
| 404 | Note not found |
| 500 | Internal server error |

## Project Structure

```text
notes-tast-api/
│
├── models/
│   └── Note.js
│
├── postman/
│   └── collections/
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

The `.env` file is kept locally and excluded from version control.

## API Testing

All API endpoints were tested using Postman.

The Postman collection includes requests for:

- CRUD operations
- Search and filtering
- Sorting
- Pagination
- Input validation
- Invalid and nonexistent note IDs

## Future Improvements

- Add user authentication and authorization
- Implement user-specific notes
- Add automated API testing
- Improve API documentation
