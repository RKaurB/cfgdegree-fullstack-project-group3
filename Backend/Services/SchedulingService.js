// ======================================
// Plant care templates
// ======================================

// Each plant type has a predefined care template.
// Each template contains tasks and how often they should be completed.

const templates = {
    Herb: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 3
        },
        {
            taskName: "Check plant health and pests",
            frequencyDays: 7
        },
        {
            taskName: "Harvest or trim leaves",
            frequencyDays: 14
        }
    ],
    Flower: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 2
        },
        {
            taskName: "Remove dead flowers",
            frequencyDays: 7
        },
        {
            taskName: "Feed plant",
            frequencyDays: 14
        }
    ],
    Vegetable: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 1
        },
        {
            taskName: "Check plant health and pests",
            frequencyDays: 5
        },
        {
            taskName: "Harvest ripe produce if ready",
            frequencyDays: 7
        }
    ],
    GeneralPlant: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 4
        },
        {
            taskName: "Check plant health and pests",
            frequencyDays: 7
        },
        {
            taskName: "Check plant growth and prune/harvest if needed",
            frequencyDays: 14
        }
    ],
}


// ======================================
// Select care template
// ======================================

// Selects the appropriate care template based on plant type
// If no matching template exists, GeneralPlant is used as a fallback template
function getTemplate (plantType) {

    if (templates[plantType]){
        return templates[plantType]
    }
    
    return templates.GeneralPlant

};


// ======================================
// Calculate due date
// ======================================

// Calculates task due date, by adding frequencyDays to the date the task was created
function calculateDueDate (dateAdded, frequencyDays) {

      const dueDate = new Date(dateAdded);

      dueDate.setDate(dueDate.getDate() + frequencyDays);

      return dueDate.toISOString().split("T")[0];
      
};


// ======================================
// Generate initial care tasks 
// ======================================

// Generates initial task objects ready for Firebase storage (when  plant is added to User's garden)
function generateTasks (plant, dateAdded){

    // Select correct template
    const template = getTemplate(plant.type);

    // Array to store tasks
    const generatedTasks = [];

    // Loop through every task in template
    for (const task of template) {
        const generatedTask = {
            commonName: plant.commonName,
            taskName: task.taskName,
            frequencyDays: task.frequencyDays,
            dueDate: calculateDueDate(dateAdded, task.frequencyDays),
            // Add FB Task structure fields
            // New tasks start as false because not been done yet
            completed: false,
            completedDate: null,
            createdDate: dateAdded
        }

        // Add task to the generatedTasks array
        generatedTasks.push(generatedTask);
    }

    return generatedTasks;

};


// ======================================
// Generate next task
// ======================================

// Generates next recurring task object ready for Firebase storage, when existing task is marked as completed
function generateNextTask(task, completedDate) {

    // Copy task into nextTask
    const nextTask = {
        commonName: task.commonName,
        taskName: task.taskName,
        frequencyDays: task.frequencyDays,
        // Add new due date
        dueDate: calculateDueDate(completedDate, task.frequencyDays),
        // New task, so starts as false
        completed: false,
        completedDate: null,
        createdDate: completedDate
    }

    return nextTask;
}


// Export functions
module.exports = {
    getTemplate,
    calculateDueDate,
    generateTasks,
    generateNextTask
}