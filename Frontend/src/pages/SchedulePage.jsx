import { useEffect, useState } from "react";
import styles from "../SchedulePage.module.css";
import { GetTaskList, UpdateTaskCompletion } from "../api/TaskAPI";

function SchedulePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await GetTaskList();
        const data = await res.json();

        if (res.status === 200) {
          setTasks(data.data || []);
        } else {
          setError(data.error || data.message || "Could not load tasks.");
        }
      } catch (error) {
        console.error(error);
        setError("Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskComplete = async (taskId) => {
    try {
      const res = await UpdateTaskCompletion(taskId, true);
      const data = await res.json();

      if (res.status === 200) {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
          )
        );
      } else {
        alert(data.message || "Could not update task.");
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to the backend.");
    }
  };

  const upcomingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  if (loading) {
    return (
      <main className={styles.schedulePage}>
        <p>Loading your care schedule...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.schedulePage}>
        <p>{error}</p>
      </main>
    );
  }

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
                  <h3>{task.commonName}</h3>
                  <p>{task.taskName}</p>
                  <p className={styles.date}>Due: {task.dueDate}</p>
                  <span className={styles.status}>Upcoming</span>
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
              ✅ {task.taskName} for {task.commonName}
            </p>
          ))
        )}
      </section>
    </main>
  );
}

export default SchedulePage;