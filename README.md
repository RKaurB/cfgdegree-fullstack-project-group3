# cfgdegree-fullstack-project-group3
Group project for the CFGdegree Fullstack stream (Spring/Summer 2026).

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