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
## Features and MVP Screen
### Key Features
(Most basic MVP for a working product)
- User authentication – user can register, log in, log out
- Search plants – user can search plants using Perenual API
- View Plant details – user can view plant information and images
- My Garden (dashboard) – user can add/save plants to garden, and view those plants
- View Care schedule – user can automatically generate care/growth tasks, e.g. sow seeds, water basil
- Track tasks – allows user to view tasks and mark tasks as complete

### External API
- Perenual API (for plant data)

### Potential extensions
- Weather API
- Notifications
- Nature/gardening-related quotes (random) displayed on Dashboard

### Basic User Journey

Register/login → Search plants → View Plant Details → Add/save Plant to My Garden (dashboard) → Generate Care/Growing task schedule → View those tasks (including upcoming tasks) → Mark those tasks as complete

### MVP Screens
1. Login/Register (with Welcome section)

2. Dashboard (My Garden)
    - Nav bar
    - Welcome message: Hello {{your name}}, Welcome to your Garden!
    - My Garden: contains Plant Cards with date added, View button takes you to Plant Details
    - Add Plant button takes you to Search/Add a Plant page
    - Upcoming Tasks: e.g. snapshot of next 3 upcoming tasks (e.g. Water Basil tomorrow ), View All Tasks button 
    
3. Search/Add a Plant
    - Search Bar (Search Plant)
    - Results cards (e.g. Basil | Herb | Add to Garden)
    - Popular Plants cards – a small number of pre-selected ‘popular’ cards to choose from, as an alternative to using the Search bar. 

4. Plant Details (View plant information)
    - Plant name, image, and info (e.g.  type, watering frequency, grow/sunlight requirements, care difficulty) - all pulled from plant API
    - Add to Garden button or (if already added) details of when added/option to remove from garden

5. Care/Growth Schedule
    - Auto-generated growth schedule tick-boxes/to do list with dates (e.g. Sow seeds, water, prune, harvest plant, etc)
    - View upcoming/completed tasks
    - Track and complete tasks
