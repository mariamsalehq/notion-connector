function toNotionPayload(task) {
  const required = ["taskTitle", "priority", "dueDate", "owner"];
  const missing = required.filter(f => !task[f]);
  if (missing.length) {
    return { error: `Missing required fields: ${missing.join(", ")}` };
  }
  const priorityMap = { low: "Low", medium: "Medium", high: "High", urgent: "High" };
  return {
    parent: { database_id: "mock_database_id" },
    properties: {
      Name: { title: [{ text: { content: task.taskTitle } }] },
      Priority: { select: { name: priorityMap[task.priority.toLowerCase()] || "Medium" } },
      "Due Date": { date: { start: task.dueDate } },
      Owner: { rich_text: [{ text: { content: task.owner } }] },
      Description: { rich_text: [{ text: { content: task.description || "" } }] },
      Source: { rich_text: [{ text: { content: task.sourceForm || "" } }] }
    }
  };
}
