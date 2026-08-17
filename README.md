# VerifyX

### Blockchain-Based Product Authentication & Supply Chain Traceability Platform

VerifyX is a blockchain-based product authentication and supply-chain traceability platform designed to combat counterfeit products and improve transparency across the product lifecycle.

The system connects physical products with unique digital identities using QR codes, while blockchain and smart contracts are planned to provide tamper-resistant product records and verifiable supply-chain history.

---

## Project Overview

Counterfeit products are a major challenge across modern markets. Consumers often have limited ways to verify whether a product is genuine, while traditional supply-chain systems may provide limited visibility into product movement and can be vulnerable to data manipulation.

VerifyX aims to address this problem by combining:

- Product registration
- Unique product IDs
- QR-based product verification
- Supply-chain tracking
- Role-based access control
- MongoDB for application data
- Blockchain for tamper-resistant records
- Smart contracts for decentralized verification

The long-term goal is to provide stakeholders and consumers with a reliable way to trace and verify products throughout their lifecycle.

---

## Key Features

### Product Registration

Manufacturers can register products with information such as:

- Product name
- Brand
- Category
- Batch number
- Manufacturing date
- Product description

Each product receives a unique VerifyX Product ID.

Example:

```text
VX-2026-000001
```

### QR-Based Verification

Each registered product can be associated with a unique QR code containing its public verification identity.

A customer can scan the QR code and access:

```text
Physical Product
       ↓
QR Code
       ↓
VerifyX Product ID
       ↓
Product Record
       ↓
Verification Status
       ↓
Supply Chain History
```

### Supply Chain Traceability

Products can move through multiple supply-chain stages:

```text
Manufacturer
      ↓
Distributor
      ↓
In Transit
      ↓
Retailer
      ↓
Customer
```

Authorized stakeholders can record product events as the product moves through the supply chain.

### Blockchain Verification

The planned blockchain layer will store important product and supply-chain records using smart contracts.

This will provide:

- Tamper-resistant records
- Verifiable transaction history
- Product authenticity validation
- Greater transparency between stakeholders

Blockchain integration is planned for Phase 3.

---

## Technology Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- JavaScript / JSX

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- Mongoose

### Blockchain

- Solidity
- Ethereum-compatible blockchain
- Hardhat
- Ganache

### Authentication

- JWT
- bcrypt

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman / Thunder Client

---

## System Architecture

The planned architecture is:

```text
                    ┌──────────────────────┐
                    │    VerifyX Frontend  │
                    │ React + Vite +       │
                    │ Tailwind CSS         │
                    └──────────┬───────────┘
                               │
                            REST API
                               │
                    ┌──────────▼───────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └───────┬───────┬──────┘
                            │       │
                            │       │
                     ┌──────▼───┐   │
                     │ MongoDB  │   │
                     │ Database │   │
                     └──────────┘   │
                                    │
                             ┌──────▼──────┐
                             │ Blockchain  │
                             │   Layer     │
                             │             │
                             │ Smart       │
                             │ Contract    │
                             └─────────────┘
```

---

## User Roles

VerifyX is designed around multiple supply-chain roles.

### Admin

Responsible for:

- User management
- Product oversight
- Platform monitoring
- Verification monitoring

### Manufacturer

Responsible for:

- Registering products
- Managing registered products
- Initiating supply-chain movement

### Distributor

Responsible for:

- Receiving products
- Updating shipment status
- Tracking products through distribution

### Retailer

Responsible for:

- Receiving products
- Managing inventory
- Updating product status

### Customer

Customers do not require an account.

They can:

- Scan a product QR code
- Enter a Product ID
- View product information
- View supply-chain history
- Check verification status

---

## Project Workflow

The planned end-to-end workflow is:

```text
Manufacturer
      │
      ▼
Register Product
      │
      ▼
Generate Unique Product ID
      │
      ▼
Create Product Record
      │
      ▼
Store Application Data
      │
      ▼
Generate QR Code
      │
      ▼
Product Enters Supply Chain
      │
      ├───────────────┐
      ▼               ▼
Distributor       Supply Chain Event
      │
      ▼
Retailer
      │
      ▼
Customer
      │
      ▼
Scan QR Code
      │
      ▼
VerifyX Verification Page
      │
      ▼
Retrieve Product Record
      │
      ▼
Check Product History
      │
      ▼
Blockchain Validation
      │
      ▼
Authentic / Potential Counterfeit
```

---

## Development Status

The project is being developed incrementally.

### Phase 0 — Project Architecture

**Status: Completed**

Initial architecture has been established for:

- Frontend
- Backend
- Database
- Blockchain
- Smart contracts
- Authentication
- Supply-chain tracking

### Phase 1 — Frontend Foundation

**Status: Completed**

Implemented:

- VerifyX design system
- Responsive frontend
- Landing page
- Authentication UI
- Dashboard layouts
- Role-based dashboard interfaces
- Product registration UI
- Product details UI
- Product tracking UI
- Product timeline
- Public verification page
- QR scanner interface placeholder
- Reusable UI components
- Responsive navigation
- Verification success/failure UI states

The public verification page supports:

```text
Verify Your Product
        ↓
Product ID Input
        OR
QR Scanner
        ↓
Verification Result
```

The current Phase 1 verification experience uses mock data and UI states.

### Phase 2 — Backend + Local MongoDB

**Status: In Progress**

Planned implementation:

- Node.js + Express backend
- Local MongoDB
- Mongoose models
- User registration
- JWT authentication
- Password hashing
- Role-based access control
- Product APIs
- Supply-chain APIs
- Public verification API
- Frontend-backend integration

### Phase 3 — Blockchain & Smart Contracts

**Status: Planned**

Planned implementation:

- Solidity smart contract
- Hardhat development environment
- Local Ethereum-compatible blockchain
- Product registration on-chain
- Supply-chain event recording
- Blockchain transaction hashes
- Blockchain-based verification
- Backend-to-smart-contract integration

### Phase 4 — Supply Chain Integration

**Status: Planned**

Implementation of the complete stakeholder workflow:

```text
Manufacturer
      ↓
Distributor
      ↓
In Transit
      ↓
Retailer
      ↓
Customer
```

with:

- Role validation
- Controlled state transitions
- Supply-chain events
- Product ownership/current-holder tracking
- Blockchain event recording

### Phase 5 — QR Verification

**Status: Planned**

Implementation of:

- Real QR generation
- QR scanning
- Product ID extraction
- Public verification
- Blockchain validation
- Authentic product result
- Potential counterfeit detection

### Phase 6 — Admin & Analytics

**Status: Planned**

Planned features:

- Admin dashboard
- User management
- Product analytics
- Verification statistics
- Supply-chain monitoring
- Potential counterfeit reports
- Blockchain transaction monitoring

### Phase 7 — Testing & Security

**Status: Planned**

Testing will include:

- Unit testing
- API testing
- Smart contract testing
- Authentication testing
- RBAC testing
- Invalid state transition testing
- Product verification testing
- Security testing
- Frontend validation

### Phase 8 — Deployment

**Status: Planned**

Production deployment will include:

- Frontend deployment
- Backend deployment
- Database deployment
- Blockchain deployment
- Environment variable management
- CI/CD
- Production security configuration

---

## Repository Structure

```text
verifyx-workspace/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   └── blockchain.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── supplyChain.controller.js
│   │   │   ├── verification.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   └── error.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── SupplyChainEvent.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── supplyChain.routes.js
│   │   │   ├── verification.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── product.service.js
│   │   │   ├── supplyChain.service.js
│   │   │   ├── verification.service.js
│   │   │   └── blockchain.service.js
│   │   │
│   │   ├── utils/
│   │   │   ├── hash.js
│   │   │   ├── qr.js
│   │   │   └── response.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   └── shared/
│   │   │       ├── QRScanner.jsx
│   │   │       ├── ProductTimeline.jsx
│   │   │       ├── StatusBadge.jsx
│   │   │       └── ProductCard.jsx
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── Web3Context.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useBlockchain.js
│   │   │   └── useToast.js
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   └── public/
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authApi.js
│   │   │   ├── productApi.js
│   │   │   └── blockchainApi.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── formatters.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
│
├── smart-contracts/
│   ├── contracts/
│   │   ├── VerifyX.sol
│   │   └── RoleManager.sol
│   │
│   ├── scripts/
│   │   └── deploy.js
│   │
│   ├── test/
│   │   └── VerifyX.test.js
│   │
│   ├── .env.example
│   ├── hardhat.config.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## Product Verification Concept

The core VerifyX verification process is based on a unique digital identity assigned to each product.

```text
Physical Product
       │
       ▼
Unique QR Code
       │
       ▼
VerifyX Product ID
       │
       ▼
Product Database Record
       │
       ▼
Supply Chain History
       │
       ▼
Blockchain Record
       │
       ▼
Verification Result
```

---

## Supply Chain State Model

Products are intended to follow controlled state transitions:

```text
MANUFACTURED
      │
      ▼
DISPATCHED
      │
      ▼
IN_TRANSIT
      │
      ▼
RECEIVED
      │
      ▼
SOLD
```

A product may also be flagged when suspicious activity or an invalid record is detected:

```text
Any Relevant State
        │
        ▼
      FLAGGED
```

The backend will enforce valid state transitions instead of allowing arbitrary status changes.

---

## Data Model

### User

```text
User
├── name
├── email
├── password
├── organization
├── role
├── walletAddress
└── isActive
```

### Product

```text
Product
├── productId
├── name
├── brand
├── category
├── description
├── batchNumber
├── manufacturingDate
├── manufacturer
├── price
├── imageUrl
├── status
├── currentHolder
├── registeredBy
├── verificationHash
└── blockchainRecordId
```

### SupplyChainEvent

```text
SupplyChainEvent
├── productId
├── eventType
├── fromRole
├── fromUser
├── toRole
├── toUser
├── location
├── notes
├── timestamp
├── transactionHash
└── blockchainRecorded
```

---

## Why Blockchain?

Traditional centralized systems depend on a trusted database or organization to maintain product records.

VerifyX plans to use blockchain for records where:

- Data integrity is important
- Multiple stakeholders are involved
- Historical records should be tamper-resistant
- Product authenticity requires independent verification

MongoDB and blockchain will serve different purposes.

### MongoDB

MongoDB will be used for:

- Application data
- User information
- Product metadata
- Dashboard data
- Efficient querying
- Supply-chain application state

### Blockchain

The blockchain layer will be used for:

- Important product registration records
- Supply-chain event records
- Tamper-resistant history
- Smart-contract-based validation
- Verifiable transaction history

---

## Security Considerations

The planned system includes:

- JWT authentication
- Password hashing
- Role-based access control
- Backend request validation
- Protected APIs
- Controlled supply-chain state transitions
- Smart-contract authorization
- Tamper-resistant blockchain records

Security features will be implemented progressively across the development phases.

---

## Installation

### Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd verifyx-workspace
```

### Frontend

The current Phase 1 frontend can be run using:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run using the Vite development server.

### Backend

Backend setup is being implemented as part of Phase 2.

The planned local development environment uses:

```text
MongoDB Community Server
        ↓
mongodb://127.0.0.1:27017/verifyx
```

Backend installation and API documentation will be updated after Phase 2 is completed.

### Blockchain

Blockchain setup will be documented after Phase 3 implementation.

The planned development environment includes:

- Hardhat
- Ganache
- Solidity
- Ethereum-compatible blockchain

---

## Development Approach

VerifyX is being developed incrementally so that each subsystem can be implemented and tested independently.

```text
Phase 0
Project Architecture
        ↓
Phase 1
Frontend + UI
        ↓
Phase 2
Backend + MongoDB + Authentication
        ↓
Phase 3
Smart Contract + Blockchain
        ↓
Phase 4
Supply Chain Integration
        ↓
Phase 5
QR Verification
        ↓
Phase 6
Admin + Analytics
        ↓
Phase 7
Testing + Security
        ↓
Phase 8
Deployment
```

---

## Future Scope

Future versions of VerifyX may include:

- IoT-based real-time product tracking
- GPS-based supply-chain monitoring
- AI-assisted counterfeit detection
- Dedicated mobile application
- Enterprise supply-chain integration
- Multi-manufacturer support
- Advanced analytics
- On-chain verification dashboards
- Automated anomaly detection

---

## Academic Project

**Project:** VerifyX

**Institution:** Rajiv Gandhi Institute of Technology, Mumbai

**Department:** Information Technology

**Class:** BE

**Semester:** VII

**Academic Year:** 2026–27

---

## Project Team

| Name | Role |
|------|------|
| Priyanka Rao | Developer |
| Team Member 2 | Developer |
| Team Member 3 | Developer |
| Team Member 4 | Developer |

---

## Project Status

```text
Current Phase: Phase 1 — Frontend Foundation

Frontend UI:             ██████████ 100%
Backend:                 ░░░░░░░░░░ 0%
MongoDB:                 ░░░░░░░░░░ 0%
Authentication:          ░░░░░░░░░░ 0%
Supply Chain Backend:    ░░░░░░░░░░ 0%
Smart Contract:          ░░░░░░░░░░ 0%
Blockchain Integration:  ░░░░░░░░░░ 0%
QR Integration:          ░░░░░░░░░░ 0%
Testing:                 ░░░░░░░░░░ 0%
Deployment:              ░░░░░░░░░░ 0%
```

---

## Disclaimer

VerifyX is an academic project developed as a prototype for demonstrating blockchain-based product authentication and supply-chain traceability.

The current implementation is being developed incrementally and does not yet represent a production-ready supply-chain infrastructure.

---

## License

This project is developed for academic and educational purposes.
