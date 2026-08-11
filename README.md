# 🎬 Movie Streaming Website

A full-stack **Movie Streaming Web Application** built with the MERN stack and modern web technologies.

The application provides users with a complete movie-browsing experience, including **OTP-based registration, secure login, movie search, genre-based browsing, movie details, video streaming, and a personalized Watch Later list**.

---

## 🚀 Live Demo

🌐 **Live Application:**
https://movie-streaming-ten.vercel.app/

💻 **GitHub Repository:**
https://github.com/Prasath-Rama-Krishnan/Movie-streaming

---

## 🧠 Project Overview

This project is designed as a real-world movie streaming platform where users can discover and watch movies through a responsive Single Page Application.

Users can:

* Create an account using email OTP verification
* Login securely using their registered credentials
* Browse available movies
* Search movies by title
* Explore movies by genre
* View detailed movie information
* Watch movie videos
* Add movies to a personal Watch Later list
* Remove movies from their Watch Later list
* View their profile information

Movie metadata such as title, genre, poster, description, director, actors, IMDb rating and language is stored in MongoDB. The backend also integrates with the **OMDb API** to retrieve movie information.

---

## ✨ Features

### 🔐 Authentication

* User registration
* Email-based OTP verification
* Secure password hashing using bcrypt
* JWT-based authentication
* Login and authentication state management
* Protected user functionality

During registration, the backend generates an OTP, stores the verification information, and sends the OTP through email. After successful verification, the user account is created/verified.

### 🎥 Movie Browsing

* Display available movies
* Movie posters
* Movie descriptions
* IMDb ratings
* Release year
* Genre
* Director
* Actors
* Language
* Movie video URL

The movie model stores these details in MongoDB.

### 🔎 Movie Search

Users can search for movies by title using the search functionality.

The backend performs case-insensitive title matching using MongoDB queries.

### 🎭 Genre Browsing

Movies can be organized and displayed according to genres such as:

* Action
* Romance
* Comedy
* Thriller
* Crime
* Drama
* Musical
* Fantasy
* Adventure

The backend includes genre-resolution logic to identify a primary genre for movies with multiple genres.

### ▶️ Movie Streaming

Users can open a movie and watch its associated video content directly through the application.

Movie records contain a dedicated `videoUrl` field for the streaming source.

### ⏰ Watch Later

Users can create a personalized Watch Later collection.

Features include:

* Add a movie to Watch Later
* View saved movies
* Remove movies from Watch Later

The Watch Later movies are stored against the authenticated user's MongoDB document.

### 👤 User Profile

Authenticated users can view their profile information through the profile section.

---

## 🛠️ Technologies Used

| Layer          | Technologies        |
| -------------- | ------------------- |
| Frontend       | React 19, Vite      |
| Routing        | React Router        |
| HTTP Client    | Axios               |
| Backend        | Node.js, Express.js |
| Database       | MongoDB, Mongoose   |
| Authentication | JWT, bcryptjs, OTP  |
| Email          | Nodemailer          |
| Movie Data     | OMDb API            |
| Media Storage  | Cloudinary          |
| File Upload    | Multer              |
| Styling        | CSS                 |
| Deployment     | Vercel / Render     |

The frontend currently uses React 19, Vite, React Router and Axios.

The backend dependencies include Express, Mongoose, JWT, bcryptjs, Cloudinary, Multer, Nodemailer, Axios and CORS.

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │       Backend       │
                    └──────┬──────┬───────┘
                           │      │
              ┌────────────┘      └─────────────┐
              ▼                                 ▼
     ┌─────────────────┐               ┌─────────────────┐
     │     MongoDB     │               │    OMDb API     │
     │ User + Movies   │               │ Movie Metadata  │
     └─────────────────┘               └─────────────────┘
              │
              ▼
     ┌─────────────────┐
     │    Cloudinary   │
     │  Media Storage  │
     └─────────────────┘
```

---

## 📁 Project Structure

```text
Movie-streaming/
│
├── backend/
│   │
│   ├── config/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   ├── Movie.js
│   │   ├── Otp.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── scripts/
│   ├── services/
│   ├── utils/
│   │
│   ├── .nvmrc
│   ├── Server.js
│   └── package.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── OtpVerify.jsx
│   │   │
│   │   ├── Components/
│   │   ├── api/
│   │   │   ├── api.js
│   │   │   └── userApi.js
│   │   │
│   │   ├── assets/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── GenrePage.jsx
│   │   │   ├── MoviePage.jsx
│   │   │   ├── Search.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── router/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── common.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```

The repository currently separates the frontend and backend and uses dedicated folders for authentication, pages, APIs, controllers, models, routes, middleware and services.

---

## 🔄 Application Workflow

### User Registration

```text
User enters name, email & password
              ↓
      Backend receives data
              ↓
       Password is hashed
              ↓
        OTP is generated
              ↓
       OTP sent by email
              ↓
       User enters OTP
              ↓
       OTP is verified
              ↓
      Account is activated
```

### Movie Discovery

```text
User
  ↓
Landing Page
  ↓
Browse Movies
  ↓
Search / Genre
  ↓
Movie Details
  ↓
Watch Movie
```

### Watch Later

```text
Movie Details
      ↓
Add to Watch Later
      ↓
Authenticated User
      ↓
MongoDB User Document
      ↓
Watch Later Collection
```

---

## 🔐 Authentication Flow

The application uses multiple technologies to handle authentication:

* **bcryptjs** for password hashing
* **OTP verification** through email
* **JWT** for authenticated sessions
* **MongoDB** for user information
* **Nodemailer** for sending OTP emails

The backend stores users with fields such as name, email, password, verification status and Watch Later movie references.

---

## 🎞️ Movie Data

Each movie record can contain:

```text
Title
Video URL
Description
Release Year
Genre
Primary Genre
Poster URL
Director
Actors
IMDb Rating
Language
```

Movie information is managed using a Mongoose schema and can be enriched using the OMDb service.

---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Prasath-Rama-Krishnan/Movie-streaming.git

cd Movie-streaming
```

---

### 2. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

The current frontend package is configured with Vite and uses `npm run dev` for development.

---

### 3. Backend Setup

Open a new terminal:

```bash
cd backend

npm install

npm start
```

Backend runs locally using:

```text
http://localhost:5000
```

The backend's `start` script runs `node Server.js`.

For development with automatic restart:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

OMDB_API_KEY=your_omdb_api_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

> ⚠️ Never commit your `.env` file or API keys to GitHub.

---

## 🌐 Deployment

### Frontend

The frontend is deployed on **Vercel**.

🌐 Live URL:

https://movie-streaming-ten.vercel.app/

### Backend

The backend can be deployed separately using a Node.js hosting platform such as Render.

Make sure the frontend's API configuration points to the deployed backend URL.

---

## 📚 Key Learning Outcomes

Through this project, I gained practical experience in:

* Building a full-stack MERN application
* Developing reusable React components
* Implementing client-side routing
* Building REST APIs with Express.js
* Working with MongoDB and Mongoose
* Implementing JWT authentication
* Implementing OTP-based email verification
* Password hashing using bcrypt
* Integrating third-party APIs
* Working with Cloudinary
* Handling file uploads using Multer
* Creating search and filtering functionality
* Managing user-specific Watch Later data
* Connecting React frontend with Node.js backend
* Deploying a full-stack application

---

## 🔮 Future Improvements

* Add movie ratings and reviews
* Add personalized movie recommendations
* Add pagination and infinite scrolling
* Add advanced search filters
* Add watch history
* Add continue-watching functionality
* Add multiple video quality options
* Improve streaming performance
* Add admin dashboard for movie management
* Add refresh-token based authentication
* Add automated testing

---

## 👨‍💻 Author

### Prasath R

**Computer Science & Engineering**

🌐 **Portfolio:**
https://portfolio-005.vercel.app/

💼 **LinkedIn:**
https://www.linkedin.com/in/prasath-ramakrishnan-567a71295

💻 **GitHub:**
https://github.com/Prasath-Rama-Krishnan

---

## ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

**Thanks for checking out the project!**
