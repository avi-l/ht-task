= Sample House Valuation Web App =

This guide provides step-by-step instructions on how to set up and run the Vite web app locally on your machine.

== Prerequisites ==
Make sure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)

== Installation ==

1. Clone the repository from GitHub:

```
git clone https://github.com/avi-l/ht-task.git
```

2. Navigate to the project directory:

```
cd your-repo

```

3. Install the project dependencies for both the client and the backend:

```

npm install

```

4. Configure the backend:

- Navigate to the backend directory:

```
cd backend

```

- Configure the database:
- Create a new PostgreSQL database for your app.
- Update the database configuration in the `config/config.js` file with your database credentials.

5. Configure the frontend:

- Navigate to the client directory:

```

cd client

```

- Update the necessary configuration files based on your requirements.

== Database Migration ==
The backend uses Sequelize for database migrations. Follow these steps to perform the initial database migration:

1. Navigate to the backend directory:

```

cd backend

```

```

```
