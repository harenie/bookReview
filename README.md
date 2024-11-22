
# **Book Review Application**

This is a full-stack **Book Review Application** that allows users to browse, add, edit, and delete book reviews. The backend is built using **Node.js** and **Express.js**, and the frontend is developed using **React.js**. The application uses **MySQL** to store book reviews.

---

## **Prerequisites**

1. **MySQL** installed on your system.
2. **Node.js** and **npm** installed on your system.
3. **React.js** (via Create React App) for the frontend.

---

## **Project Setup**

### Step 1: Clone the repository

Clone the repository to your local machine.

```bash
git clone <repository_url>
cd book-review
```

### Step 2: Set up the MySQL Database

1. Open your MySQL command line or MySQL Workbench.
2. Create a new database called `myapp`.

```sql
CREATE DATABASE myapp;
```

3. Create a new user with username `jhon` and password `12345`.

```sql
CREATE USER 'jhon'@'localhost' IDENTIFIED BY '12345';
```

4. Grant the necessary privileges to the new user.

```sql
GRANT ALL PRIVILEGES ON myapp.* TO 'jhon'@'localhost';
```

5. Flush privileges.

```sql
FLUSH PRIVILEGES;
```

6. Now, you need to run the database schema SQL file to generate the tables and data. Save the SQL script provided below as `schema.sql` and run it in your MySQL.

```sql
USE myapp;

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  reviewText TEXT NOT NULL,
  dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO reviews (title, author, rating, reviewText) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 5, 'An amazing classic with themes of wealth, love, and loss.'),
  ('1984', 'George Orwell', 4, 'A thought-provoking book about surveillance and totalitarianism.'),
  ('To Kill a Mockingbird', 'Harper Lee', 5, 'A timeless story of racial injustice and the loss of innocence.');
```

Run the above `schema.sql` script to create the `reviews` table and insert some initial data.

---

### Step 3: Backend Setup (Node.js and Express)

1. Navigate to the backend folder inside your project.

```bash
cd backend
```

2. Install the necessary dependencies.

```bash
npm install
```

3. Configure the database connection in the backend. Open the `backend/config/database.js` file and modify the connection settings:

```javascript
module.exports = {
  host: 'localhost',
  user: 'jhon',
  password: '12345',
  database: 'myapp'
};
```

4. Start the backend server.

```bash
npm start
```

This will start the backend server on `http://localhost:5000`.

---

### Step 4: Frontend Setup (React.js)

1. Navigate to the frontend folder.

```bash
cd frontend
```

2. Install the necessary dependencies for the frontend.

```bash
npm install
```

3. Start the frontend application.

```bash
npm start
```

This will start the React.js frontend on `http://localhost:3001`.

---

### Step 5: Access the Application

- The frontend will be available at `http://localhost:3001`.
- The backend API will be available at `http://localhost:3000`.

You can now interact with the application. You will be able to:
- View a list of book reviews.
- Add, update, and delete reviews.
- Filter reviews based on ratings.

---

---

## **Project Technologies**

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
---

## **Conclusion**

This **Book Review Application** allows users to share their opinions on books and discover new books through reviews from others. It demonstrates a full-stack application built with React for the frontend, Node.js and Express for the backend, and MySQL as the database.


---