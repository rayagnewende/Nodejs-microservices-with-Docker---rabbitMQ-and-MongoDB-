import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import amqp from "amqplib";

const app = express();
const port = 3001;

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/tasks")
  .then(() => console.log("Mongodb is connected!"))
  .catch(() => "mongoDB a eu un prblème!!!");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model("Task", taskSchema);
let channel, connection;
/* async function connectRabbitMQwithRetry(retries = 5, delay = 3000) {
  while (retries) {
    try {
      connection = await amqp.connect("amqp://rabbitmq");
      channel = await connection.createChannel();
      await channel.assertQueue("task_created");
      console.log("Connected to rabbitMQ");
      return;
    } catch (error) {
      console.error("RabbitMQ connection error : ", error.message);
      retries--;
      console.error("retrying again : ", retries);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
} */

async function connectRabbitMQwithRetry(retries = 15, delay = 3000) {
  while (retries) {
    try {
      console.log("Trying to connect to RabbitMQ...");
      connection = await amqp.connect("amqp://rabbitmq");
      connection.on("error", (err) =>
        console.error("RabbitMQ connection error:", err)
      );
      connection.on("close", () => console.warn("RabbitMQ connection closed"));

      channel = await connection.createChannel();
      await channel.assertQueue("task_created");

      console.log("✅ Connected to RabbitMQ and queue task_created is ready!");
      return;
    } catch (error) {
      console.error("❌ RabbitMQ connection error:", error.message);
      retries--;
      console.log(`Retrying in ${delay / 1000}s... (${retries} retries left)`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log("there was a problem about getting tasks!");
    res.status(500).json({ error: "Internal server error!" });
  }
});
app.post("/tasks", async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const task = new Task({ title, description, userId });
    await task.save();

    const message = { taskId: task._id, userId, title };
    if (!channel) {
      return res.status(503).json({ error: "RabbitMQ not connected !!" });
    }

    channel.sendToQueue("task_created", Buffer.from(JSON.stringify(message)));
    res.status(201).json(task);
  } catch (error) {
    console.log("there was a problem about user saving tasks");
    res.status(500).json({ error: "Internal server error!" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello Word!");
});

app.listen(port, () => {
  console.log("====================================");
  console.log("this server is running on " + port + "tasks service");
  console.log("====================================");
  connectRabbitMQwithRetry();
});
