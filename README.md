# 🎯 Event Registration System

A **backend system** for managing events and user registrations, built with **Node.js + Express.js + MongoDB**.
The project includes **authentication (JWT)** and role-based access control (User, Organizer, Admin).

---

## 📌 Features

* User management (Register – Login – Roles).
* Create, view, update, and delete events.
* Register users for events.
* View and cancel user registrations.
* Role-based access (Organizers and Admins have special permissions).

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* Bcrypt.js (Password hashing)
* dotenv (Environment variables)

---

## 📂 Project Structure

```
event-registration-system/
│── server.js
│── config/
│    └── db.js
│── models/
│    ├── User.js
│    ├── Event.js
│    └── Registration.js
│── middlewares/
│    └── auth.js
│── routes/
│    ├── auth.js
│    ├── events.js
│    └── registrations.js
│── package.json
│── .env (not included in repo)
│── README.md
```

---

## ⚙️ Installation & Run

1. **Clone the project**

   ```bash
   git clone https://github.com/username/event-registration-system.git
   cd event-registration-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/eventdb
   JWT_SECRET=yourSecretKey
   PORT=5000
   ```

4. **Run the server**

   ```bash
   npm start
   ```

   or

   ```bash
   node server.js
   ```

---

## 🚀 API Endpoints

### Auth

* `POST /api/auth/register` → Register a new user
* `POST /api/auth/login` → Login user

### Events

* `GET /api/events` → Get all events
* `GET /api/events/:id` → Get event details
* `POST /api/events` (Organizer/Admin) → Create an event
* `PUT /api/events/:id` (Organizer/Admin) → Update an event
* `DELETE /api/events/:id` (Admin only) → Delete an event

### Registrations

* `POST /api/registrations/:eventId` → Register user for an event
* `GET /api/registrations` → View user registrations
* `DELETE /api/registrations/:id` → Cancel registration

---

## 👨‍💻 Roles

* **User**: Can register for events and view/cancel their registrations.
* **Organizer**: Can create and update events.
* **Admin**: Full access, including deleting events.

---

## 📜 Notes

* Do not commit the `.env` file (contains sensitive data).
* Use Postman or similar tools to test the APIs.

---

✍️ Developed by **Mohamed Ahmed Mohamed Altoum**
