# Dockerized MEAN

A dockerized MEAN application for adding posts. 

### Running

```bash
docker-compose up
```
Containers use:
* Port 4200 for frontend
* Port 3000 for backend
* Port 27017 for mongodb

### Project Structure

```bash
dockerized-mean/
  frontend/             # Angular source code
      e2e/              # Default end to end tests
      src/              # Model classes
          app/          # Angular app
              auth      # Authorization module
              header    # Header component
              posts     # Posts module
      Dockerfile        # Docker file for frontend
  backend/              # Node.js source code
      controllers/      # Controls the routes
          posts.js      # Control logic for post routes
          users.js      # Control logic for user routes
      middleware/       # Middleware
          auth.js       # Authentication middleware
      models            # Mongoose schemas
      routes/           # Handles routing
          posts.js      # Router for posts
          users.js      # Router for users
      app.js            # Express app
      index.js          # Starting point for backend
      Dockerfile        # Dockerfile for backend
  docker-compose.yml    # Docker configuration file
  README.md             # Brief documentation