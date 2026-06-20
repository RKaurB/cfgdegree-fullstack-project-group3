// ======================================
// create templates for each plant type
// ======================================

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
// Function to get template
// ======================================

function getTemplate (plantType){
    if (templates[plantType]){
        return templates[plantType]
    }
        return templates.GeneralPlant
};

// test getTemplate function
// console.log(getTemplate("Herb"))
// console.log(getTemplate("Plant"))


// ======================================
// Function to calculate task due date
// ======================================

function calculateDueDate (dateAdded, frequencyDays){
      const dueDate = new Date(dateAdded);
      dueDate.setDate(dueDate.getDate() + frequencyDays)
      return dueDate.toISOString().split("T")[0]
};
// test calculateDueDate function
// console.log(calculateDueDate("2026-06-01", 5));


// ======================================
// Generate initial care tasks 
// ======================================

/* Tested step by step:
   - template selection
   - due date calculation
   - task generation
   - task array creation */

// Generates task objects ready for Firebase storage
function generateTasks (plant, dateAdded){

    // Select correct template
    const template = getTemplate(plant.type);

    // Array to store tasks
    const generatedTasks = [];

    // // Test task
    // const generatedTask = {
    //     // Plant name
    //     commonName: plant.commonName,
    //     // First task in template
    //     taskName: template[0].taskName,
    //     // First task frequency
    //     frequencyDays: template[0].frequencyDays,
    //     // Calculate due date
    //     dueDate: calculateDueDate(dateAdded, template[0].frequencyDays)
    // }

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

    // return template;   
    return generatedTasks;
    // return generatedTask;

};


// // Test generateTasks function
// const carrot = {
//     commonName: "carrot",
//     type: "Vegetable"
// }
//  console.log(generateTasks(carrot, "2026-06-01"));


// ======================================
// Generate next task
// ======================================

/* Tested:
   - due date calculation
   - recurring task creation */

// Generates next recurring task object, ready for FB storage
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

    // return task

    return nextTask;
}

// // Test
// const task = {
//     commonName: "carrot",
//     taskName: "Check soil and water if dry",
//     frequencyDays: 1
// }

// console.log(generateNextTask(task, "2026-06-02"));