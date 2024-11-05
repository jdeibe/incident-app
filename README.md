# Incident Management System

A Next.js application for managing support incidents.

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB
- Docker and Docker Compose (for containerized development)

### Installation

#### Local Development

1. Clone the repository:

```bash
git clone <repository-url>
cd incident-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/incidents
```

4. Run the development server:

```bash
npm run dev
```

#### Docker Development

1. First time setup or after dependencies change:

```bash
# Build the development containers
docker compose -f docker-compose.dev.yml build

# Start the development environment
docker compose -f docker-compose.dev.yml up
```

2. Regular development commands:

```bash
# Start the development environment
docker compose -f docker-compose.dev.yml up

# Stop the environment
docker compose -f docker-compose.dev.yml down

# View logs
docker compose -f docker-compose.dev.yml logs -f app

# Rebuild and start (if dependencies change)
docker compose -f docker-compose.dev.yml up --build
```

The application will be available at http://localhost:3000

### Features

- Create, read, update, and delete incidents
- Sort incidents by any column
- Pagination
- Responsive design
- MongoDB integration

### API Routes

- GET /api/incidents - List all incidents
- POST /api/incidents - Create a new incident
- GET /api/incidents/[id] - Get a specific incident
- PUT /api/incidents/[id] - Update an incident
- DELETE /api/incidents/[id] - Delete an incident

## Development

The Docker development setup includes:

- Hot reloading (changes to your code will automatically rebuild)
- Volume mounting for local development files
- MongoDB container with persistent data
- Development-specific environment variables

### Project Structure

```
├── app
│ ├── api/
│ │ └── incidents/
│ ├── components/
│ │ ├── IncidentForm.tsx
│ │ ├── IncidentGrid.tsx
│ │ └── ui/
│ └── lib/
│   ├── db.ts
│   ├── models/
│   └── utils.ts
├── docker-compose.dev.yml
├── Dockerfile.dev
└── next.config.mjs
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Deployment

For production deployment:

```bash
# Build the production image
docker build -t incident-app .

# Run the production container
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_uri incident-app
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
