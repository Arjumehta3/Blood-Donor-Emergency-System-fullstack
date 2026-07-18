# BloodBridge — Donor Network

**India's Open Blood Donor Network** — A free, community-driven platform connecting blood donors with patients across India, with no hospital restrictions and no fees.

![Status](https://img.shields.io/badge/status-active-brightgreen) ![Frontend](https://img.shields.io/badge/frontend-React-blue) ![Backend](https://img.shields.io/badge/backend-Spring%20Boot-green)

---

## 🩸 Overview

BloodBridge is a web application that helps people find and register blood donors quickly during emergencies. The platform is built as a two-part system:

- **Public landing site** (`localhost:3001`) — marketing/home page for visitors, donor sign-up, and sign-in.
- **Authenticated dashboard app** (`localhost:3000`) — the donor network portal where logged-in users can search donors, register new donors, manage their profile, and respond to emergencies.

The backend is powered by **Spring Boot**, with a connection status indicator shown directly in the app sidebar ("Spring Boot Connected").

![Homepage](./screenshots/homepage.png)

---

## ✨ Key Stats (Landing Page)

| Metric | Value |
|---|---|
| Active Donors | 50K+ |
| Lives Saved | 1.2L+ |
| Cities Covered | 500+ |
| Emergency Support | 24/7 |

---

## 📄 Pages & Features

### 1. Homepage
The public-facing landing page introduces the platform's mission ("Find a donor, save a life") with two primary calls to action:
- **Become a Donor**
- **Find Donors**

It also displays sign-in/register options in the top navigation and highlights platform-wide statistics in a footer band.

### 2. Sign In
A clean authentication screen with:
- Email and password fields
- "Forgot password?" link
- Link to create a new account
- Sidebar highlights: *50,000+ Active Donors*, *Any city, any blood group*, *Emergency alerts 24×7*

![Sign In](./screenshots/login.png)

### 3. Sign Up (Create Account)
A two-step registration flow:
- **Step 1:** Full Name, Email, Phone, Password (minimum 6 characters, must include letters, numbers & symbols)
- **Step 2:** (continues after Step 1 — likely blood group/location details)

![Sign Up](./screenshots/signup.png)

### 4. Dashboard
The authenticated home screen, greeting the user by name with the current date. It includes:
- **Summary cards:** Total Donors, Emergency Requests, Available Now, Lives Saved (with trend indicators like *+8% this month*)
- **Recent Activity feed:** live updates such as new blood requests, successful donations, new donor registrations, and resolved emergencies
- **Quick Actions:** Search Donors, Add Donor, Emergency Request
- **Blood Supply overview:** availability by blood group (O+, A+, B+, AB−, O−) shown as progress bars

![Dashboard](./screenshots/dashboard.png)

### 5. Search Donors
Allows users to find available donors by:
- **Blood Group** (dropdown)
- **City** (text input)

Search results display donor cards with name, age, blood group, availability status, location, phone, email, last donation date, and a **Contact Donor** button.

![Search Donors](./screenshots/searchdonor.png)

### 6. Add Donor
A form to register a new donor to the network, split into two sections:
- **Personal Information:** Full Name, Age (18–65 years), Blood Group, and an "Available to Donate" toggle
- **Contact & Location:** Phone Number, Email, City, Full Address, Last Donation Date

Includes **Reset** and **Add Donor** actions.

![Add Donor](./screenshots/addnewdonor.png)

### 7. My Profile
Displays the logged-in user's account details:
- Avatar, name, email, account status (Active Account)
- Donation count and blood type summary
- Editable account information: Full Name, Email, Phone, City, Profession, Blood Group, Role

![My Profile](./screenshots/myprofile.png)

### 8. Emergency
A dedicated section (flagged with a notification indicator in the sidebar) for urgent blood requests — surfaced throughout the app via the Emergency Requests stat and Quick Actions.

---

## 🧭 Navigation (Sidebar)

- Dashboard
- Search Donors
- Add Donor
- Emergency 🔴
- Profile
- Connection status: **Spring Boot Connected**
- Logout

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** Spring Boot (REST API, connected live to the frontend)
- **Ports (local dev):**
  - `localhost:3000` — Authenticated app (dashboard, donors, profile)
  - `localhost:3001` — Public landing/marketing site

---

## 📸 Screens Included

| Screen | File |
|---|---|
| Homepage | `Homepage.png` |
| Sign In | `login.png` |
| Sign Up | `signup.png` |
| Dashboard | `dashboard.png` |
| Search Donors | `searchdonor.png` |
| Add Donor | `addnewdonor.png` |
| My Profile | `myprofile.png` |

---

*This README was generated from application screenshots to document the current UI/UX and feature set of BloodBridge.*
