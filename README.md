
# Notes Task API

A RESTful API built using Node.js, Express.js, and MongoDB to create, manage, search, filter, sort, and paginate notes.

This project demonstrates backend development concepts, including CRUD operations, REST API design, input validation, error handling, and database integration.



## Features

- Create new notes
- Retrieve all notes
- Retrieve a note by ID
- Update existing notes
- Delete notes
- Search notes by title or content
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
- **IntelliJ IDEA** – Development environment


## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
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
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Replace the MongoDB connection string with your own.

### 5. Start the server

```bash
node server.js
```

The server will run at:

```text
http://localhost:3000
```

## API Endpoints

Base URL: `http://localhost:3000/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create a new note |
| GET | `/` | Retrieve all notes |
| GET | `/:id` | Retrieve a note by ID |
| PUT | `/:id` | Update a note |
| DELETE | `/:id` | Delete a note |

### Example: Create a Note

**POST** `/api/notes`

Request Body:

```json
{
  "title": "Learn Node.js",
  "content": "Practice Express and MongoDB",
  "completed": false
}
```

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

### Combine Query Parameters

Search, filter, sort, and paginate in a single request.

```http
GET /api/notes?search=Java&completed=false&sort=latest&page=1&limit=2
```

## Validation and Error Handling

The API includes validation and error handling for common situations:

- Missing title or content
- Invalid note ID
- Note not found
- Invalid pagination parameters
- Invalid completion filter
- Invalid sorting option
- Search query exceeding the allowed length
- Database and server errors

## Project Structure

```text

notes-tast-api/
│
├── models/
│   └── Note.js
│
├── postman/
│   ├── collections/
│   ├── documents/
│   ├── environments/
│   ├── flows/
│   ├── globals/
│   ├── mocks/
│   └── specs/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

```

## API Testing

All API endpoints were tested using **Postman**.

The Postman collection includes requests for:

- CRUD operations
- Search and filtering
- Sorting
- Pagination
- Input validation
- Invalid and nonexistent note IDs

## Future Improvements

- Add user authentication and authorization
- Add user-specific notes
- Deploy the API to a cloud platform
