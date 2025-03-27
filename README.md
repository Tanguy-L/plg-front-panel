# PLG Admin Panel

## Overview

PLG Admin is a web-based administration panel for managing players and teams,
built using modern web technologies and custom web components.

## Features

- User Authentication
- Player Management
  - View player list
  - Edit player details
  - Filter and search players
- Team Management
  - View team list
  - Edit team details
- Responsive Design
- Dynamic Routing
- Modal-based Interactions

## Technologies Used

- Vanilla JavaScript
- Web Components
- Nord Design System
- GSAP for Animations
- Custom Router Implementation

## Prerequisites

- Modern web browser
- Internet connection (for CDN resources)

## Setup and Installation

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Login with provided credentials

## Authentication

The application uses JWT-based authentication with:

- Login endpoint
- Token storage in localStorage
- Automatic token management

## State Management

Utilizes a custom Proxy-based store with:

- Reactive data updates
- Custom event dispatching
- Global application state

## Routing

Custom router with features:

- Dynamic route handling
- Layout switching
- History management

## License

Distributed under the MIT License.

## Todo

- Make custom AUTH event and load data on login
