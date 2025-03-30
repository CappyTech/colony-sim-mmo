## Overview

Colony Sim MMO is a browser-based, massively multiplayer online game where users manage one or more in-game players. Each player directs a group of controlled NPCs—referred to as **Subjects**—to build settlements, join factions, form temporary parties, gather resources, and complete quests. Real-time interactions are powered by Socket.IO, while persistent data is managed via Sequelize with a modular and scalable architecture.

## Features

- **User & Player Management:**  
  Users register and log in to create and manage multiple Players.

- **Subject Control:**  
  Players direct Subjects (controlled NPCs) that perform actions such as resource gathering, combat, and settlement management.

- **Dynamic Settlements:**  
  Build and upgrade settlements (town, village, castle, camp, compound, or farm) with customizable attributes.

- **Factions & Parties:**  
  Form long-term Factions and temporary Parties for collaborative missions and events.

- **Resource & Inventory Systems:**  
  Collect resources and manage items to improve your players and settlements.

- **Quests & Events:**  
  Engage in narrative-driven quests and world events that dynamically change the game landscape.

- **Real-Time Communication:**  
  Socket.IO handles both local (room-based) and global real-time updates for a responsive, multiplayer experience.

## Architecture

### Data Models

The game uses Sequelize to define the following models:

- **User:**  
  Contains account information (username, email, password) and owns multiple Players.

- **Player:**  
  Represents an in-game persona controlled by a user. A Player directs one or more Subjects and has attributes like level and experience.

- **Subject:**  
  The NPCs controlled by a Player. They perform in-game tasks such as gathering resources and engaging in missions.

- **Settlement:**  
  Represents communities (towns, villages, castles, camps, compounds, farms) with unique functions like resource production and defense.

- **Faction:**  
  A long-term alliance of Subjects sharing common goals and ideologies.

- **Party:**  
  A temporary group composed of Subjects for specific missions (e.g., trade, attack, exploration).

- **Item & Inventory:**  
  Define in-game items (resources, tools, weapons) and track the quantities held by Subjects.

- **Building:**  
  Structures within Settlements that provide benefits such as increased production or defense.

- **Quest:**  
  Narrative missions with objectives and rewards, assigned to Parties or individual Subjects.

- **Event:**  
  Logs in-game occurrences for analytics, debugging, and storytelling.

### Real-Time Communication

- **Local Events:**  
  Emitted to specific clients or groups via Socket.IO rooms (e.g., party updates, individual notifications).

- **Global Events:**  
  Broadcast to all connected clients (e.g., world events, server-wide announcements).

- **Modular Organization:**  
  Socket.IO event handlers are organized in the `server/sockets` folder, grouped by functionality.

## Folder Structure

The project is organized into distinct modules to enhance maintainability and scalability. Key components include:

- **Server:** Contains the main server code that initializes Express and Socket.IO, along with dedicated modules for database models and Socket.IO event handlers.
- **Client:** Holds static assets (HTML, CSS, JavaScript) for the front end.
- **Views:** Contains EJS templates for dynamic HTML rendering.
- **Config:** Stores configuration files, such as those for database settings.
- Root-level files include project configuration files like `package.json` and documentation.

This modular organization simplifies managing and extending the codebase as the project grows.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- A relational database (e.g., PostgreSQL, MySQL)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the Repository:**

   `git clone https://github.com/your-username/colony-sim-mmo.git`  
   `cd colony-sim-mmo`

2. **Install Server Dependencies:**

   `cd server`  
   `npm install`

3. **Configure the Database:**

   Edit the database configuration file located at `server/config/config.json` with your database credentials and settings.

4. **Run Database Migrations or Sync Models:**

   If you are using Sequelize migrations, run:  
   `npx sequelize-cli db:migrate`

   For development purposes, you can also sync models directly in `server/index.js`.

5. **Install Client Dependencies:**

   If your client-side code requires additional build steps, navigate to the `client/` directory and follow the instructions provided there.

## Usage

### Running the Server

From the `server` directory, start the server in development mode using Nodemon:

npm run dev

The server will start on port 3000 (or your configured port). Open your browser and navigate to http://localhost:3000 to play the game.

### Real-Time Interaction

- **Local Events:**  
  Socket.IO rooms ensure that updates (e.g., resource changes, party events) are sent only to the relevant group.

- **Global Events:**  
  Major world events or announcements are broadcast to all connected clients.

## Development

### Modular Socket.IO Setup

All Socket.IO event handlers are organized under a dedicated folder (e.g., `server/sockets/`). Each file handles a specific set of events (e.g., `resource.js` for resource events, `player.js` for player-related events, etc.). The main file aggregates and registers these modules with the Socket.IO instance.

### Testing & Seed Data

- **Seed Data:**  
  Create scripts to populate the database with sample users, players, and game data for testing purposes.

- **Testing:**  
  Write unit and integration tests for your API endpoints and Socket.IO event handlers to ensure reliable game logic and data consistency.

## Contributing

Contributions are welcome! To contribute to Colony Sim MMO, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes with clear, descriptive commit messages.
4. Submit a pull request describing your changes and referencing any related issues.
5. Ensure that new features and bug fixes include appropriate tests.

Please adhere to the existing coding style and include tests for any new functionality.

## License

All rights reserved.
