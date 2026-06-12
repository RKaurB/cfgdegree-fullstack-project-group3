# MVP Scheduling & Task Generation Design

## Overview

The aim of this feature is to help users look after their plants by automatically creating simple care tasks when a plant is added to their Garden.

For the MVP, Garden Buddy uses a small set of our own simplified plant care templates, rather than creating plant-specific schedules for every plant. 

These templates cover three broad plant categories (`type`):

- Herbs
- Flowers
- Vegetables

Plants that do not fall into one of these categories will be assigned a General Plant template, so that all saved plants can receive a basic care schedule.   




## Workflow

When a user adds a plant to their Garden:

1. The plant `type` is retrieved from the Plant API
2. The corresponding plant care template is selected
3. Initial care tasks are generated, with due dates calculated from the date plant was added to Garden
4. Tasks are saved to Firebase
5. Tasks are displayed on the Care Schedule page
6. Recurring tasks generate their next occurrence when marked as complete

```mermaid
flowchart TD
    1["Plant API"]
    2["Plant Type"]
    3["Care Template"]
    4["Generate Tasks"]
    5["Save Tasks to Firebase"]
    6["Display on Schedule Page"]
    7["User completes Task"]
    8["Generate next occurrence"]

    1 --> 2
    2 --> 3
    3 --> 4
    4 --> 5
    5 --> 6
    6 --> 7
    7 --> 8
```

## Plant Care Schedule Templates

Templates are loosely based on real gardening principles, while remaining simple and understandable for novice gardeners.

### Herb template

**Care level/frequency:** Low

Herbs are generally grown for their leaves. They are relatively forgiving, and don't need much attention besides regular harvesting.

| Task                           | Frequency             |
|--------------------------------|-----------------------|
| Check soil and water if dry    | (every 3 days)        |
| Check plant health and pests   | (every 7 days)        |
| Harvest or trim leaves         | (every 14 days)       |

#### Example

`tarragon` added on `01/06/2026`
- [ ] Check soil and water if dry - 4 Jun
- [ ] Check plant health and pests - 8 Jun
- [ ] Harvest or trim leaves - 15 Jun


### Flower template

**Care level/frequency:** Medium

Flowers are maintained for appearance and blooms, so removing dead flowers ('deadheading') is a key recurring task.

| Task                           | Frequency             |
|--------------------------------|-----------------------|
| Check soil and water if dry    | (every 2 days)        |
| Remove dead flowers            | (every 7 days)        |
| Feed plant                     | (every 14 days)       |

#### Example

`dahlia` added on `01/06/2026`
- [ ] Check soil and water if dry - 3 Jun
- [ ] Remove dead flowers - 8 Jun
- [ ] Feed plant - 15 Jun


### Vegetable template

**Care level/frequency:** High

Vegetables need the most frequent attention, including regular watering, health (pest) checks, and harvesting. Because of wide variety in harvesting frequency between different vegetables, a weekly task prompts users to check their plants regularly and harvest if ready.

| Task                           | Frequency             |
|--------------------------------|-----------------------|
| Check soil and water if dry    | (every 1 day)         |
| Check plant health and pests   | (every 5 days)        |
| Harvest ripe produce if ready  | (every 7 days)        |

#### Example

`carrot` added on `01/06/2026`
- [ ] Check soil and water if dry - 2 Jun
- [ ] Check plant health and pests - 6 Jun
- [ ] Harvest ripe produce if ready - 8 Jun


### General Plant (fallback) template

**Care level/frequency:** Low/Medium

All other plants (including those with `type`: `null`) will be categorised as 'General Plant' and assigned this template, so that all saved plants receive a basic care schedule. It is designed to be broadly applicable to most plants.

| Task                                           | Frequency             |
|------------------------------------------------|-----------------------|
| Check soil and water if dry                    | (every 4 days)        |
| Check plant health and pests                   | (every 7 days)        |
| Check plant growth and prune/harvest if needed | (every 14 days)       |


## Schedule & task generation workflow

### 1. User adds plant

**Example:** `carrot`

Plant details are retrieved from Plant API

```
{
    "id": 2320,
    "commonName": "Carrot",
    "type": "Vegetable"
}
```

### 2. Select template

Garden Buddy reads `Vegetable` and selects the Vegetable care template (above).

### 3. Generate initial tasks

**Example:** `carrot` added on `01/06/2026`

**Due dates:**

Check soil and water if dry
`01/06/2026` + 1 days = `02/06/2026`

Check plant health and pests
`01/06/2026` + 5 days = `06/06/2026`

Harvest ripe produce if ready
`01/06/2026` + 7 days = `08/06/2026`

**Generated tasks:**

```
[
    {
        "taskType": "Check soil and water if dry",
        "dueDate": "2026-06-02",
        "completed": false
    },
    {
        "taskType": "Check plant health and pests",
        "dueDate": "2026-06-06",
        "completed": false
    },
    {
        "taskType": "Harvest ripe produce if ready",
        "dueDate": "2026-06-08",
        "completed": false
    },
]
```


### 4. Save tasks

Tasks are stored in Firebase.

**Example:**

```
{
    "userId": 3,
    "plantID": 2320,
    "plantName": "carrot",
    "taskType": "Check soil and water if dry",
    "frequencyDays": 1,
    "dueDate": "2026-06-02",
    "completed": false
}
```


## Recurring task logic

Tasks automatically generate a new recurring task when completed.

**Example workflow:**

Garden Buddy: 

1. Marks existing task as completed
2. Records the task completion date
2. Calculates next due date, using the completion date and task frequency
3. Generates next recurring task with updated due date

**Completed tasks:** 

Completed tasks remain stored in Firebase.

To allow users to track their progress (task history), completed tasks may remain visible in a separate history/completed tasks section (above or below an 'current/active tasks' section). 

To stop the Schedule page getting too cluttered, only recent completed tasks should be displayed (e.g. tasks completed within the previous two weeks, or the most recent five completed tasks).

For recurring tasks, the next due date is calculated from the date the previous task was completed, rather than the original due date.

**Example logic:**

Once task is marked completed:

```
{
    "taskType": "Check soil and water if dry",
    "completed": true,
    "completedDate": "2026-06-02",
    
}
```

the next recurring task is generated:

```
{
    "taskType": "Check soil and water if dry",
    "completed": false,
    "dueDate": "2026-06-03"
}
```


## Example user journey

```mermaid
flowchart TD
    1["User registers/logs in"]
    2["Searches for 'carrot'"]
    3["Views carrot details"]
    4["Adds carrot to their Garden"]
    5["Carrot is saved Firebase"]
    6["Vegetable template is selected"]
    7["Initial tasks are generated"]
    8["Tasks are saved in Firebase"]
    9["Schedule page displays tasks"]
    10["User completes 'Watering' task"]
    11["Next 'Watering' task is generated"]


    1 --> 2
    2 --> 3
    3 --> 4
    4 --> 5
    5 --> 6
    6 --> 7
    7 --> 8
    8 --> 9
    9 --> 10
    10 --> 11
```

## Relationship to other project areas

### Plant API

Plant API provides plant name, type, and plant information.

The scheduling system then uses the plant type to determine which care schedule template to apply.

### Firebase

Firebase stores users, their saved plants, generated tasks, and completed tasks.

### Frontend

The Frontend displays plant information, generated tasks, and task completion status.

