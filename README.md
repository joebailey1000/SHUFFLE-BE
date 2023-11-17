# Shufl.fm (backend)

Shufl.fm predicts and plays songs based on previous song ratings! This repository contains the backend services.

## Features

- **User Management**: Handles user authentication, registration, and profile management.
- **Song Rating and Feedback**: Processes user ratings and feedback to refine music recommendations.
- **Neural Network Integration**: Communicates with the Python-based neural network to generate song recommendations.

## Tech Stack (backend)

- **Runtime**: Node
- **Framework**: Express
- **Testing**: Jest, Supertest
- **AI/ML**: Python (Neural Network)
- **Database**: PostgreSQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Python 3.x
- pip
- PostgreSQL

### Installation

1. Clone the repo:
    `git clone https://github.com/joebailey1000/SHUFFLE-BE.git`

2. Install the npm packages:
    `npm i` (or `yarn run`)

3. Install python dependencies:
    `pip install -r requirements.txt`
    - If you get `Error: externally-managed-environment` you may need to set up your own virtual environment
        `python3 -m venv <name_of_venv>`
        `source <name_of_venv>/bin/activate`

### Scripts
- Create Databases:
    `npm run setup-db`

- Seed Databases:
    `npm run seed-prod`

- Instruct server to listen:
    `npm run start`

- Run test suite:
    `npm test app`
    `npm test api`

### Team Members
[Rob Lehane](https://github.com/rob-Lehane)
[Joe Bailey](https://github.com/joebailey1000)
[Nick Diplos](https://github.com/nickdip)
[Louis Roach](https://github.com/LouisRoach)




