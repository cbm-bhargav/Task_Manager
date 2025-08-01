# Task_Manager_App
A full-stack Task Manager Application built using React, Node.js, Express, GraphQL, Prisma, MySQL, TanStack React Query, and Tailwind CSS. This app allows users to create, manage, and organize tasks efficiently with a modern UI and drag-and-drop support.

---

## 🚀 Features

- 🧾 Create new tasks with **name**, **title**, **description**, and **status**
- 🔄 Drag & Drop tasks between columns to update their status
- 🖊️ Edit and 🗑️ delete existing tasks
- 🔍 Search functionality to quickly find tasks
- ⚡ Auto UI updates with **TanStack React Query** cache invalidation
- ⚙️ Backend using **GraphQL** and **Prisma ORM**
- 💾 MySQL database for persistent task storage
- 💅 Responsive and modern UI built with **Tailwind CSS**

---

## 🛠️ Tech Stack

| Layer         | Technology                                      |
|--------------|--------------------------------------------------|
| Frontend     | React, JSX, TanStack React Query, Tailwind CSS   |
| Backend      | Node.js, Express, GraphQL, Prisma                |
| Database     | MySQL                                            |
| Tooling      | Bun or npm, ESLint, Prettier                     |

---

## 📂 Folder Structure

taskmanager/
├── backend/
│ ├── prisma/ 
│ │ ├──migration/# Prisma schema
│ │ ├──schema.prisma/# Prisma migrations for mysql table
│ ├──Src/
│ │ ├── resolvers/ # GraphQL resolvers
│ │ ├── schema/ # GraphQL type definitions
│ │ └── index.js # Express + Apollo Server
├── frontend/
│ ├── components/ # Reusable React components
│ ├── graphql/ # Queries and mutations
│ ├── lib/ # GraphqlClient for backend connection
│ ├── App.jsx # App routing and layout
│ └── main.jsx # Entry point
└── README.md


---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js & npm (or Bun)
- MySQL installed and running
- Prisma CLI installed globally (`npm i -g prisma`)

---

### 🔧 Backend Setup

cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
node src/index.js

### 💻 Frontend Setup

cd frontend
bun install   # or npm install
bun dev       # or npm run dev

---

### 🙌 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---
### 👨‍💻 Author
Made with ❤️ by Bhargav Chauhan
