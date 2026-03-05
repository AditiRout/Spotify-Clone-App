
---

# 🎵 Spotify Clone – Microservices Architecture

A **Spotify-inspired music streaming application** built using **Spring Boot Microservices, Angular, MongoDB, and Eureka Service Discovery**.
The application allows users to **register/login, search music using Spotify API, and manage a personal wishlist of songs**.

---

# 📌 Project Overview

This project follows a **Microservices Architecture** where each service is responsible for a specific functionality.

The application consists of:

* **Auth Service** – Handles authentication and JWT token generation
* **User Service** – Manages user information and password reset
* **Wishlist Service** – Allows users to add or remove songs from wishlist
* **Music Service** – Fetches music data using the Spotify API
* **Eureka Server** – Service discovery
* **Angular Frontend** – User interface

---

# 🏗️ Architecture

```
Angular Frontend
       │
       ▼
 API Gateway (Optional)
       │
 ┌───────────────┬───────────────┬───────────────┬───────────────┐
 │ Auth Service  │ User Service  │ Wishlist Svc  │ Music Service │
 │               │               │               │               │
 │ JWT Auth      │ User Mgmt     │ Favorites     │ Spotify API   │
 └───────────────┴───────────────┴───────────────┴───────────────┘
                │
                ▼
          Eureka Server
                │
                ▼
             MongoDB
```

---

# ⚙️ Tech Stack

## Backend

* **Spring Boot**
* **Spring Security**
* **JWT Authentication**
* **Spring Data MongoDB**
* **Netflix Eureka**
* **JUnit Testing**
* **REST APIs**

## Frontend

* **Angular**
* **TypeScript**
* **HTML5**
* **CSS3**
* **Bootstrap**

## External API

* **Spotify Web API**

---

# 📂 Microservices

## 1️⃣ Auth Service

Handles **user authentication and JWT token generation**.

Base URL

```
/auth
```

### APIs

#### Check Service

```
GET /auth/check
```

Response

```
working
```

---

### Register User

```
POST /auth/register
```

Request Body

```json
{
  "name": "Aditi",
  "email": "aditi@gmail.com",
  "password": "password123",
  "securityQuestion": "Your first school?",
  "securityAnswer": "DAV"
}
```

Response

```
201 CREATED
```

---

### Login User

```
POST /auth/login
```

Request

```json
{
  "email": "aditi@gmail.com",
  "password": "password123"
}
```

Response

```json
{
  "token": "JWT_TOKEN",
  "userId": "USER_ID"
}
```

---

### Extract Username from Token

```
GET /auth/extract-username
```

Header

```
Authorization: Bearer <JWT_TOKEN>
```

Response

```
username/email
```

---

### Get User from Token

```
GET /auth/get-user
```

Header

```
Authorization: Bearer <JWT_TOKEN>
```

Response

```json
{
  "id": "123",
  "email": "user@gmail.com"
}
```

---

# 👤 2️⃣ User Service

Handles **user profile management and password reset**.

Base URL

```
/users
```

---

### Get All Users

```
GET /users
```

Response

```json
[
  {
    "id": "1",
    "email": "user@gmail.com"
  }
]
```

---

### Get User by ID

```
GET /users/{id}
```

---

### Get User ID by Email

```
GET /users/email/{email}
```

Response

```
UserId
```

---

### Update User

```
PUT /users/{id}
```

Request

```json
{
  "name": "Updated Name"
}
```

---

### Delete User

```
DELETE /users/{id}
```

---

### Reset Password

```
POST /users/reset-password
```

Request

```json
{
  "email": "user@gmail.com",
  "securityQuestion": "Your first school?",
  "securityAnswer": "DAV",
  "password": "newpassword"
}
```

Response

```
Password successfully reset
```

---

# ❤️ 3️⃣ Wishlist Service

Allows users to **add songs to their wishlist (favorites)**.

Base URL

```
/wishlist
```

---

### Add Song to Wishlist

```
POST /wishlist/add
```

Request

```json
{
  "userId": "123",
  "trackName": "Shape of You",
  "artistName": "Ed Sheeran",
  "albumImage": "image_url"
}
```

Response

```json
{
  "id": "wishlistId",
  "trackName": "Shape of You"
}
```

---

### Get User Wishlist

```
GET /wishlist/user/{userId}
```

Response

```json
[
  {
    "trackName": "Shape of You",
    "artistName": "Ed Sheeran"
  }
]
```

---

### Search Wishlist by Track Name

```
GET /wishlist/song/{trackName}
```

---

### Remove Song from Wishlist

```
DELETE /wishlist/remove/{id}
```

Response

```json
{
  "message": "Item removed from wishlist"
}
```

---

# 🎧 4️⃣ Music Service

Fetches music data from the **Spotify Web API**.

Base URL

```
/music
```

---

### Search Music

```
GET /music/search?query={songName}
```

Example

```
GET /music/search?query=believer
```

Response

```json
{
  "tracks": [
    {
      "name": "Believer",
      "artist": "Imagine Dragons",
      "album": "Evolve"
    }
  ]
}
```

---

# 🔍 5️⃣ Eureka Server

Used for **service discovery** between microservices.

Services register themselves automatically.

Dashboard

```
http://localhost:8761
```

---

# 🖥️ Frontend (Angular)

The frontend is developed using **Angular** and interacts with backend microservices via REST APIs.

### Features

* User Registration
* Login with JWT Authentication
* Search Music using Spotify API
* Add Songs to Wishlist
* View Wishlist
* Remove Songs from Wishlist

---

# 🧪 Testing

JUnit test cases are implemented for:

* Service layer
* Controller layer
* Exception handling

---

# 🚀 How to Run the Project

### 1️⃣ Start Eureka Server

```
mvn spring-boot:run
```

---

### 2️⃣ Start Microservices

Run in this order:

```
auth-service
user-service
wishlist-service
spotify-music-service
```

---

### 3️⃣ Start Angular Frontend

```
npm install
ng serve
```

Application will run at

```
http://localhost:4200
```

---

# 📁 Project Structure

```
spotify-clone
│
├── eureka-server
├── auth-service
├── user-service
├── wishlist-service
├── music-service
└── spotify-frontend-angular
```

---

# 🔐 Security

Security is implemented using:

* **Spring Security**
* **JWT Authentication**
* **BCrypt Password Encryption**

---

# ✨ Features

✔ User Authentication
✔ JWT Token Authorization
✔ Spotify Music Search
✔ Wishlist Management
✔ Microservices Architecture
✔ Service Discovery using Eureka
✔ Angular Frontend
✔ JUnit Testing

---

# 📌 Future Improvements

* API Gateway implementation
* Playlist creation
* Music streaming support
* Docker containerization
* Deployment on AWS

---

