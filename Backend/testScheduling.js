// Scheduling Service Tests

// Import scheduling functions from SchedulingService.js
const {getTemplate, calculateDueDate, generateTasks, generateNextTask} = require("./Services/SchedulingService");


// ========================================
// Test getTemplate()
// ========================================

// Test that the correct template is selected based on plant type
console.log("TEMPLATE TEST\n");

console.log("Herb template:", getTemplate("Herb"));
console.log("General template:", getTemplate("Plant"));
console.log("\n");


// ========================================
// Test calculateDueDate()
// ========================================

// Test that frequencyDays are added correctly to create task due date
console.log("DUE DATE TEST\n");

console.log("Task due:", calculateDueDate("2026-06-01", 5));
console.log("\n");


// ========================================
// Test generateTasks()
// ========================================

// Test that task object is created ready for Firestore storage
console.log("GENERATE TASKS TEST\n");

const carrot = {
    commonName: "carrot",
    plantType: "Vegetable"
}
console.log(generateTasks(carrot, "2026-06-01"));

console.log("\n");


// ========================================
// Test generateNextTask()
// ========================================

// Test that the next recurring task object is created ready for Firestore storage
console.log("RECURRING TASK TEST\n");

const task = {
    commonName: "carrot",
    taskName: "Check soil and water if dry",
    frequencyDays: 1
}

console.log(generateNextTask(task, "2026-06-02"));

console.log("\n");