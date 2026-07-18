#  Blood Donor Emergency System

A full-stack web application that connects blood donors with people in urgent need of blood, enabling faster emergency response through real-time donor search, request management, and notifications.



##  About the Project

The **Blood Donor Emergency System** is designed to bridge the gap between blood donors and recipients during emergencies. Users can register as donors, search for available donors by blood group and location, raise emergency blood requests, and get notified when a match is found — helping save lives faster.

##  Features

-  User authentication & authorization (JWT-based)
-  Donor registration with blood group, location & contact details
-  Search donors by blood group, city/pincode & availability
-  Emergency blood request posting
-  Responsive UI for mobile and desktop

##  Tech Stack

**Backend**
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL 

**Frontend**
- React.js
- React Router
- Axios
-  CSS 

**Other Tools**
- Maven
- Postman (API testing)
- Git & GitHub

##  System Architecture

```
React (Frontend) ⇄ REST API ⇄ Spring Boot (Backend) ⇄ MySQL (Database)
```

##  Getting Started

### Prerequisites

Make sure you have the following installed:

- [Java JDK 17+](https://www.oracle.com/java/technologies/downloads/)
- [Maven](https://maven.apache.org/download.cgi)
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

```

##  API Endpoints

| Method | Endpoint                  | Description                    |
|--------|----------------------------|---------------------------------|
| POST   | `/api/auth/register`       | Register a new user/donor      |
| POST   | `/api/auth/login`          | Login and get JWT token        |
| GET    | `/api/donors`              | Get list of all donors         |
| GET    | `/api/donors/search`       | Search donors by blood group/location |




##  Project Structure

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

```

## 📸 Screenshots

### Home Page
![Home Page](assets/Homepage.png)

### Sign Up / Login
| Create Account | Sign In |
|-----------------|---------|
| ![Signup](assets/Register.png) | ![Login](assets/Login.png) |

### Dashboard
![Dashboard](assets/Homepage.png)

### Search Donors & Add Donor
| Search Donors | Add Donor |
|----------------|-----------|
| ![Search Donors](assets/Search.png) | ![Add Donor](assets/donor.png) |



##  Roadmap

- [ ] SMS/Email notifications for emergency requests
- [ ] Geolocation-based donor matching
- [ ] Blood bank inventory integration
- [ ] Mobile app version

