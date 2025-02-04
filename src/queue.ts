import express from "express";

const app = express();

app.use(express.json());

const messagesQueues = new Map<string, string[]>();

app.post("/messages/:queue", (req, res) => {
  const { queue } = req.params;
  const { message } = req.body;

  // Check if the queue exists, if not, create it
  if (!messagesQueues.has(queue)) {
    messagesQueues.set(queue, []);
  }

  messagesQueues.get(queue)?.push(message);

  res.status(201).json({ message: "Message added to the queue" });
});

app.get("/messages/:queue", (req, res) => {
  const { queue } = req.params;

  if (!messagesQueues.has(queue)) {
    return void res.status(404).json({ message: "Queue not found" });
  }

  // Get the first message from the queue and remove it
  const messages = messagesQueues.get(queue)?.shift();

  res.json({ messages });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
