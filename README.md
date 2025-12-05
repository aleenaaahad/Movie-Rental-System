#  Movie Rental System

##  Overview

A simple **Movie Rental Management System** that allows customers to browse and rent movies.
The application includes:

* Java Servlet–based backend
* MySQL relational database
* Tomcat application server
* React frontend (optional)

---

##  Technologies Used

### **Backend**

* **Java Servlets**
* **Apache Tomcat 9**
* **MySQL Server**
* **Gson** (JSON serialization)
* **Manual `javac` compilation**
* **JDBC**

### **Frontend (Optional)**

* **Node.js + npm**
* React.js
* TailwindCSS
* Fetch API

### **Required JARs (inside `WEB-INF/lib/`)**

* `mysql-connector-j.jar`
* `gson.jar`
* `servlet-api.jar`

---

##  2. Installation & Setup Instructions

### **1. Set up the database**

Open **MySQL Workbench** or MySQL terminal and run:

```sql
SOURCE C:/Users/16692/Downloads/MovieRental_Local.session (1).sql;

```

This will create:

* `MovieRentalDB`
* All tables (Movies, Customers, Rentals, etc.)
* Triggers
* Views
* Sample data

---

### **2. Configure Database Connection**

In `DatabaseConnection.java`, set:

```java
URL = "jdbc:mysql://localhost:3306/MovieRentalDB";
USERNAME = "root";
PASSWORD = "your password";
```

Make sure the database name matches exactly: **MovieRentalDB**

---

### **3. Compile Backend Code**

Run this inside the backend directory:

```sh
javac -cp "WEB-INF/lib/*;WEB-INF/classes" -d WEB-INF/classes src/com/movierental/model/*.java src/com/movierental/database/*.java src/com/movierental/dao/*.java src/com/movierental/servlet/*.java
```

This outputs `.class` files into:

```
WEB-INF/classes/
```

---

### **4. Deploy on Tomcat**

Place your backend folder/WAR under:

```
Tomcat 9.0/webapps/
```

Start Tomcat, then visit:

```
http://localhost:8080/movie-renting/api/movies
```

You should now see JSON movie data.

---

##  Common SQL Operations

### **Add a movie**

```sql
INSERT INTO Movies (Title, Year, Duration, NumOfCopies, DefaultPrice, Description, Rating, Genre)
VALUES ('Demo Movie', 2024, 120, 5, 4.99, 'Description here', 'PG-13', 'Action');
```

### **Update a movie**

```sql
UPDATE Movies
SET DefaultPrice = 7.99
WHERE Title = 'Demo Movie';
```

### **Delete a movie**

```sql
DELETE FROM Movies
WHERE Title = 'Demo Movie';
```

---

