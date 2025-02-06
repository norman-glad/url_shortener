# URL Shortening Service

A simple URL shortening service built with **Express** and **Node.js** for the backend, and **React** with **Vite** for the frontend. This service allows users to shorten long URLs, track clicks, and manage shortened URLs.

---

## Features

- Shorten long URLs into compact, shareable links.
- Redirect users to the original URL when the shortened URL is accessed.
- Track the number of clicks on each shortened URL.
- Update or delete existing shortened URLs.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React, Vite
- **Database**: MongoDB (or any database you're using)
- **URL Shortening**: `shortid` library for generating unique URL codes

---

## API Endpoints

The backend exposes the following RESTful API endpoints:

### Base URL: `/api/url`

#### 1. **Get All URLs**
- **Endpoint**: `GET /getall`
- **Description**: Retrieves all shortened URLs stored in the database.
- **Response**: 
  ```json
  [
    {
      "originalUrl": "https://example.com",
      "shortUrl": "abc123",
      "urlCode": "abc123",
      "clicks": 0
    }
  ]
  ```

#### 2. **Shorten a URL**
- **Endpoint**: `POST /shorten`
- **Description**: Creates a shortened URL for the provided original URL.
- **Request Body**:
  ```json
  {
    "originalUrl": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "originalUrl": "https://example.com",
    "shortUrl": "abc123",
    "urlCode": "abc123",
    "clicks": 0
  }
  ```

#### 3. **Redirect to Original URL**
- **Endpoint**: `GET /:shortUrlCode`
- **Description**: Redirects the user to the original URL associated with the provided short URL code.
- **Response**: Redirects to the original URL or returns a `404` if the URL is not found.

#### 4. **Update a Shortened URL**
- **Endpoint**: `PUT /:shortUrl`
- **Description**: Updates the original URL associated with a given short URL.
- **Request Body**:
  ```json
  {
    "originalUrl": "https://newexample.com"
  }
  ```
- **Response**:
  ```json
  {
    "originalUrl": "https://newexample.com",
    "shortUrl": "abc123",
    "urlCode": "abc123",
    "clicks": 0
  }
  ```

#### 5. **Delete a Shortened URL**
- **Endpoint**: `DELETE /:shortUrl`
- **Description**: Deletes a shortened URL from the database.
- **Response**:
  ```json
  {
    "message": "URL deleted successfully"
  }
  ```

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB (or your preferred database) set up and running.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <backend-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd <frontend-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` (or the port Vite is running on).

---

## Usage

1. **Shorten a URL**: Use the frontend interface or send a `POST` request to `/api/url/shorten` with the original URL.
2. **Access a Shortened URL**: Visit `/api/url/<shortUrlCode>` in your browser or via an HTTP request.
3. **Manage URLs**: Use the `PUT` and `DELETE` endpoints to update or delete shortened URLs.

---

## Links

- [Live Application](https://url-shortener-t0je.onrender.com)
- [project url](https://roadmap.sh/projects/url-shortening-service)
