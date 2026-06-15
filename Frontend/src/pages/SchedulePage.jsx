import { useState } from "react";
import styles from "../SchedulePage.module.css";

const startingTasks = [
  {
    id: 1,
    plantName: "Basil",
    task: "Water plant",
    dueDate: "15 June 2026",
    status: "Due soon",
    completed: false,
  },
  {
    id: 2,
    plantName: "Tomato",
    task: "Check soil",
    dueDate: "17 June 2026",
    status: "Upcoming",
    completed: false,
  },
  {
    id: 3,
    plantName: "Rose",
    task: "Remove dead flowers",
    dueDate: "18 June 2026",
    status: "Upcoming",
    completed: false,
  },
];

function SchedulePage() {
  const [tasks, setTasks] = useState(startingTasks);

  const handleTaskComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const upcomingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <main className={styles.schedulePage}>
      <section className={styles.header}>
        <h1>Care/Growth Schedule</h1>
        <p>
          Keep track of your plant care tasks and mark them as complete when
          they are done.
        </p>
      </section>

      <section className={styles.scheduleContainer}>
        <div className={styles.plantOverview}>
          <h2>Plant Care Overview</h2>
          <p>
            This page helps users see upcoming care tasks for plants saved in
            their garden.
          </p>

          <ul>
            <li>Watering reminders</li>
            <li>Soil checks</li>
            <li>Plant maintenance tasks</li>
          </ul>
        </div>

        <div className={styles.taskSection}>
          <h2>Upcoming Tasks</h2>

          {upcomingTasks.length === 0 ? (
            <p>No upcoming tasks. Great job keeping up with your garden!</p>
          ) : (
            upcomingTasks.map((task) => (
              <div key={task.id} className={styles.taskCard}>
                <div>
                  <h3>{task.plantName}</h3>
                  <p>{task.task}</p>
                  <p className={styles.date}>Due: {task.dueDate}</p>
                  <span className={styles.status}>{task.status}</span>
                </div>

                <button onClick={() => handleTaskComplete(task.id)}>
                  Mark Complete
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className={styles.completedSection}>
        <h2>Completed Tasks</h2>

        {completedTasks.length === 0 ? (
          <p>No completed tasks yet.</p>
        ) : (
          completedTasks.map((task) => (
            <p key={task.id} className={styles.completedTask}>
              ✅ {task.task} for {task.plantName}
            </p>
          ))
        )}
      </section>
    </main>
  );
}

export default SchedulePage;