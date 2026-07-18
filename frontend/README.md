# 🩸 Blood Donor Emergency System

A full-stack web application that connects blood donors with people in urgent need of blood, enabling faster emergency response through real-time donor search, request management, and notifications.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 📖 About the Project

The **Blood Donor Emergency System** is designed to bridge the gap between blood donors and recipients during emergencies. Users can register as donors, search for available donors by blood group and location, raise emergency blood requests, and get notified when a match is found — helping save lives faster.

## ✨ Features

- 🔐 User authentication & authorization (JWT-based)
- 🧑‍⚕️ Donor registration with blood group, location & contact details
- 🔍 Search donors by blood group, city/pincode & availability
- 🚨 Emergency blood request posting
- 📩 Notifications/alerts to nearby matching donors
- 🗂️ Donor & request history dashboard
- 🛡️ Admin panel to manage users and requests
- 📱 Responsive UI for mobile and desktop

## 🛠️ Tech Stack

**Backend**
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL / PostgreSQL

**Frontend**
- React.js
- React Router
- Axios
- Tailwind CSS / Bootstrap (update as per your project)

**Other Tools**
- Maven
- Postman (API testing)
- Git & GitHub

## 🏗️ System Architecture

```
React (Frontend) ⇄ REST API ⇄ Spring Boot (Backend) ⇄ MySQL (Database)
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Java JDK 17+](https://www.oracle.com/java/technologies/downloads/)
- [Maven](https://maven.apache.org/download.cgi)
- [Node.js & npm](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/) (or PostgreSQL)
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/blood-donor-emergency-system.git

# Navigate to backend folder
cd blood-donor-emergency-system/backend

# Configure database credentials in
# src/main/resources/application.properties

# Build and run the Spring Boot application
mvn clean install
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

### Frontend Setup

```bash
# Navigate to frontend folder
cd blood-donor-emergency-system/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start at `http://localhost:3000`

## 🔑 Environment Variables

Create an `application.properties` (or `.yml`) file inside `backend/src/main/resources/`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blood_donor_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

Create a `.env` file inside the `frontend/` folder:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## 📡 API Endpoints

| Method | Endpoint                  | Description                    |
|--------|----------------------------|---------------------------------|
| POST   | `/api/auth/register`       | Register a new user/donor      |
| POST   | `/api/auth/login`          | Login and get JWT token        |
| GET    | `/api/donors`              | Get list of all donors         |
| GET    | `/api/donors/search`       | Search donors by blood group/location |
| POST   | `/api/requests`            | Create an emergency blood request |
| GET    | `/api/requests`            | Get all blood requests         |
| PUT    | `/api/requests/{id}`       | Update request status          |
| DELETE | `/api/requests/{id}`       | Delete a request                |

> Update this table with your actual controller endpoints.

## 📂 Project Structure

```
blood-donor-emergency-system/
├── backend/
│   ├── src/main/java/com/bloodbank/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── model/
│   │   └── config/
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── public/
└── README.md
```

## 📸 Screenshots

> Add screenshots or GIFs of your app here once available.

| Home Page | Donor Search | Emergency Request |
|-----------|---------------|--------------------|
| _add image_ | _add image_ | _add image_ |

## 🗺️ Roadmap

- [ ] SMS/Email notifications for emergency requests
- [ ] Geolocation-based donor matching
- [ ] Blood bank inventory integration
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Your Name — your.email@example.com

Project Link: [https://github.com/your-username/blood-donor-emergency-system](https://github.com/your-username/blood-donor-emergency-system)