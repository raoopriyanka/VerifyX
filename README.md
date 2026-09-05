# VerifyX - Immutable Product Authentication & Supply Chain Traceability

VerifyX protects enterprise supply chains and consumer trust through **cryptographic tracking, role-based custody transfers, and smart contract verification**.

## Key Features

* **Cryptographic Custody Handover Tracking:** Secure asset transfers between manufacturers, distributors, and retailers.
* **Tamper-Evident Smart Contract Event Ledger:** Immutable logging on blockchain networks using Solidity and Hardhat.
* **Instant Customer QR Provenance Verification:** Public-facing portal allowing consumers to verify product authenticity instantly via text search or QR code scanning.
* **Role-Based Access Control (RBAC):** Granular authorization for administrators, manufacturers, distributors, and retailers.

## Tech Stack

| Layer                            | Technologies                                             |
| -------------------------------- | -------------------------------------------------------- |
| **Frontend**                     | React.js, Tailwind CSS, Lucide Icons, React Router, jsQR |
| **Backend**                      | Node.js, Express.js, JavaScript (ESM)                    |
| **Smart Contracts / Blockchain** | Solidity, Hardhat                                        |
| **Database**                     | MongoDB, Mongoose                                        |

## Prerequisites

Ensure you have the following installed on your system before proceeding:

* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **MongoDB** (local instance or MongoDB Atlas connection string)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/VerifyX.git
cd VerifyX
```

### 2. Backend Setup

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend development server:

```bash
npm run dev
```

The backend server will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a separate terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will run on:

```text
http://localhost:5173
```

The frontend connects to the backend server running on:

```text
http://localhost:5000
```

## Application Usage

### Public Verification

Navigate to the home page or `/verify` to verify product authenticity using:

* A **VerifyX Product ID**
* A **QR code** by uploading or scanning a product QR code image

Public verification does **not require an account**.

### Enterprise Portal

Click **Enterprise Portal Login** to authenticate as an:

* **Administrator**
* **Manufacturer**
* **Distributor**
* **Retailer**

Authorized enterprise users can manage:

* Product minting
* Product registry
* Supply-chain records
* Custody handovers
* Product verification data

## System Overview

VerifyX combines **blockchain-based immutability**, **cryptographic product tracking**, and **role-based access control** to provide an end-to-end product authentication and supply-chain traceability system.

```text
Manufacturer
     |
     | Product Minting
     v
VerifyX Registry
     |
     | Custody Handover
     v
Distributor
     |
     | Custody Handover
     v
Retailer
     |
     | Product Purchase
     v
Consumer
     |
     | QR / Product ID Verification
     v
Public Verification Portal
     |
     v
Authenticity + Provenance
```

