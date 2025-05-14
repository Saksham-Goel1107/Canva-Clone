# 🎨 Canva Clone - Advanced Design Tool

[![Next.js](https://img.shields.io/badge/Next.js-13.5+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
![Canva Clone](/client/public/favicon.ico)

An advanced web-based design tool built with Next.js, Node.js, and Fabric.js, offering features similar to Canva with a microservices architecture.


## ✨ Features

- 🎨 Rich Design Canvas with Fabric.js
- 🖼️ Template Library
- 🤖 AI-Powered Design Suggestions
- 💾 Auto-saving Designs
- 🔄 Undo/Redo Support
- 📱 Responsive Design
- 🔐 Google Authentication
- 💳 PayPal Integration
- ☁️ Cloudinary Media Storage
- 🎯 Microservices Architecture

## 🏗️ Architecture

The application is built using a microservices architecture with the following services:

```
client/           # Next.js Frontend Application
server/
├── api-gateway/       # API Gateway Service
├── design-service/    # Design Management Service
├── upload-service/    # Media Upload Service
└── subscription-service/ # Payment & Subscription Service
```

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 13.5+
  - React 18
  - Fabric.js
  - Tailwind CSS
  - Shadcn UI

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

- **Authentication**:
  - NextAuth.js
  - Google OAuth

- **Storage**:
  - Cloudinary
  - MongoDB Atlas

- **Payment**:
  - PayPal API

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- MongoDB 4.4 or higher
- PayPal Developer Account
- Google OAuth Credentials
- Cloudinary Account

### Environment Variables

#### Client (.env.local)
```env
# Authentication
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# API Configuration
API_URL=http://localhost:4000
```

#### API Gateway (.env)
```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### Design Service (.env)
```env
PORT=4001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### Upload Service (.env)
```env
PORT=4002
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

#### Subscription Service (.env)
```env
PORT=4003
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
FRONTEND_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Saksham-goel1107/canva-clone.git
cd canva-clone
```

2. Install dependencies for all services:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server/api-gateway
npm install

cd ../design-service
npm install

cd ../upload-service
npm install

cd ../subscription-service
npm install
```

3. Start the services:
```bash
# Start client (in client directory)
npm run dev

# Start each service (in respective directories)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:4000
- Design Service: http://localhost:4001
- Upload Service: http://localhost:4002
- Subscription Service: http://localhost:4003

## 📝 API Documentation

### API Gateway Routes
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/designs` - List designs
- `POST /api/v1/designs` - Create design

### Design Service Routes
- `GET /api/v1/designs/:id` - Get design by ID
- `PUT /api/v1/designs/:id` - Update design
- `DELETE /api/v1/designs/:id` - Delete design

### Upload Service Routes
- `POST /api/v1/upload` - Upload media
- `POST /api/v1/ai/generate` - Generate AI images

### Subscription Service Routes
- `POST /api/v1/subscription/create-order` - Create PayPal order
- `POST /api/v1/subscription/capture-order` - Capture PayPal payment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact



Project Link: [https://github.com/Saksham-Goel1107/canva-clone](https://github.com/Saksham-Goel1107/canva-clone)

## 🙏 Acknowledgments

- [Fabric.js](http://fabricjs.com/)
- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [PayPal](https://developer.paypal.com/)
- [Cloudinary](https://cloudinary.com/)