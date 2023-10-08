# MyTube - Video Sharing App

MyTube is a video-sharing application that allows users to upload, view, and share videos. This README provides an overview of the application's features, technologies used, and instructions for setting up and running the app.

## Features

- User Authentication: Users can sign up, log in, and manage their profiles.
- Video Upload: Users can upload videos to share with the community.
- AWS S3 Integration: Videos and thumbnails are stored on AWS S3 using pre-signed URLs for secure and scalable storage.
- Video Viewing: Users can watch videos.
- Admin Panel: Admins can upload videos to the platform and manage user content.
- State Management: Recoil is used for efficient client-side state management.
- Backend: Express.js is used for the backend API.
- Database: Prisma ORM is used for database operations.
- Frontend: The client-side application is built using Next.js and admin client using React.js.
- Form Validation: Zod is used for input validation.
- Styling: Tailwind CSS is used for responsive and customizable styling.
- Monorepo Structure: The project is structured as a monorepo, making it easy to manage multiple components.

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js
- npm or yarn
- AWS S3 credentials (for storage)
- Database (e.g., PostgreSQL) with Prisma setup

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/tarunclub/video-sharing-app.git
   cd video-sharing-app
   ```

2. Install dependencies and start all apps (client, admin, server) using the monorepo setup:
   ```
    yarn install
    yarn dev
   ```
   The apps will be available as follows:
   - Client (Next.js): http://localhost:3000
   - Admin Panel(React.js): http://localhost:5173
   - Server (Express.js): http://localhost:8000

## Contributing

Contributions are welcome!
