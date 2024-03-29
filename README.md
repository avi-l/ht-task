# Sample House Valuation Webapp
A live version might be running here, but likely the backend db is sleeping from non-use, as this is just a demo. check it out:
https://housetable-task.onrender.com

[![Video Title](https://img.youtube.com/vi/4ijx5KaSOXI/0.jpg)](https://www.youtube.com/watch?v=4ijx5KaSOXI)

(Click on the above image to watch a demo on youtube)

This guide provides step-by-step instructions on how to set up and run the web app locally.

#### == Prerequisites ==

Make sure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)

#### == Installation and Running App ==

1. Clone the repository from GitHub:

```
git clone https://github.com/avi-l/ht-task.git
```

2. Navigate to the project directory:

```
cd ht-task
```

3. Install the project dependencies for both the client and the backend:

```
cd backend
npm install
```

4. Configure database and API credentials: create a .env file in backend root directory with the values listed in .env.template (or use the values I provided to connect to ElephantSql)
5. Start the server

```
npm run dev
```

6. Navigate to client and start the app

```
cd ../client
npm install
npm run dev
```

Your terminal should have the localhost url for you to put in a browser and start using.. enjoy!
