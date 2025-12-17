# Vehicle Booking Web Application

## Description
A web application to monitor and book company vehicles (passenger and cargo), track fuel consumption, schedule service, and maintain booking history.  
Features include:
- Multi-level approval workflow (minimum 2 levels)
- Admin can create bookings and assign drivers & approvers
- Dashboard with vehicle usage graphs
- Export booking reports to Excel
- Application logs for each process

---

## Tech Stack
- **Frontend:** Next.js 14
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL 14
- **ORM:** Prisma
- **Environment Management:** dotenv

---

## Test Accounts

| Role                  | Username               | Password      |
|-----------------------|------------------------|---------------|
| Admin (Level 1)       | admin@mail.com         | password123   |
| Approver Level 2      | suppervisor1@mail.com  | password123   |
| Approver Level 2      | suppervisor2@mail.com  | password123   |

---

## Prerequisites
- Node.js >= 20
- npm >= 9
- PostgreSQL >= 14

---

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Athallah17/FleetManagements.git
cd FleetManagements
```

### 2. Setup Backend
```bash
cd fleet-be
cp .env.example .env
npm install
```
Edit .env if needed:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/fleetmanagement"
PORT=5000
```
Run Database and Migrations
```bash
npx prisma migrate dev --name init
npm run seed
```
Run Backend Server
```bash
npm run dev
```
Server should be running on your assign Port

### 3. Setup Frintend
```bash
cd ../fleet-fe
npm install
npm run dev
```
Frontend runs on http://localhost:3000 and connects to backend automatically.

### 4. USage Flow
  #### 1. Open frontend Port in browser:
  #### 2. Login with provided test account
  #### 3. Admin can Create vehicle, booking, Assign driver and approvers
  #### 4. Supervisor can Approve or reject bookings (2-level approval)
  ### 5. View Dashboard for usage is for admin-only
  
