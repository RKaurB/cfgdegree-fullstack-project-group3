# cfgdegree-fullstack-project-group3

Group project for the CFGdegree Fullstack stream (Spring/Summer 2026).

# Team Roles & Responsibilities

This project will be developed by a team of **7 members**: **4 Frontend** and **3 Backend**.  
Each role has clear ownership while collaborating closely with other team members.

---

## Frontend Team

### 1. UX & Accessibility

**Purpose:** Design and maintain the app’s visual experience.

**Responsibilities:**

- Create wireframes and UI layouts
- Define the design system (colors, fonts, spacing)
- Ensure accessibility and usability
- Maintain consistent styling across the app
- Apply final UI polish

**Initial Task:**

- Create design system and MVP wireframes

**Collaborates With:**

- Frontend team (styling, consistency, accessibility)

---

### 2. Frontend Architecture & Navigation

**Purpose:** Structure the frontend and manage navigation.

**Responsibilities:**

- Set up frontend project structure
- Implement routing with React Router
- Build shared layouts and reusable components
- Manage navigation and protected routes
- _Does not build feature pages_

**Initial Task:**

- Set up routing and page structure

**Collaborates With:**

- Authentication & User Management
- Frontend team

---

### 3. Plant Discovery UI

**Purpose:** Build the plant search and information experience.

**Responsibilities:**

- Plant search page
- Search results UI
- Plant cards
- Plant details page

**Initial Task:**

- Build plant search page layout

**Collaborates With:**

- Plant API & Plant Management
- UX & Accessibility

---

### 4. Garden & Tasks UI

**Purpose:** Manage the user’s garden and task experience.

**Responsibilities:**

- Dashboard / My Garden page
- Saved plants display
- Tasks page
- Task completion UI
- Garden management features (view/remove plants)

**Initial Task:**

- Build dashboard layout with placeholders

**Collaborates With:**

- Scheduling & Task Management
- UX & Accessibility

---

## Backend Team

### 5. Plant API & Plant Management

**Purpose:** Handle plant data and external API integration.

**Responsibilities:**

- Research and integrate the Perenual API
- Build plant search and detail endpoints
- Create plant database model
- Save and remove plants for users
- Handle basic API errors

**Initial Task:**

- Research Perenual API and test endpoints

**Collaborates With:**

- Plant Discovery UI
- Authentication & User Management
- Scheduling & Task Management

---

### 6. Scheduling & Task Management

**Purpose:** Automate plant care tasks and scheduling.

**Responsibilities:**

- Create task database model
- Design care schedule templates
- Generate tasks automatically
- Task CRUD operations
- Track task completion and dates

**Initial Task:**

- Design care schedule templates for MVP plants

**Collaborates With:**

- Garden & Tasks UI
- Plant API & Plant Management
- Authentication & User Management

---

### 7. Authentication & User Management

**Purpose:** Manage users, authentication, and data ownership.

**Responsibilities:**

- User registration, login, and logout
- User database model
- Password hashing
- Protected routes and data access
- Ensure plants and tasks belong to the correct user

**Initial Task:**

- Create User model based on database design

**Collaborates With:**

- Frontend Architecture & Navigation
- Plant API & Plant Management
- Scheduling & Task Management
