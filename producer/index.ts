import amqp from "amqplib";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/messages/:queue", async (req, res) => {
  const { queue } = req.params; // example queue name: "emails"
  const { message } = req.body; // example message: "Hello, World!"

  try {
    // 1. Conectar a RabbitMQ
    const rabbitOptions = {
      hostname: "localhost",
      port: 5672,
      username: "admin",
      password: "admin",
    };
    const connection = await amqp.connect(rabbitOptions);

    // 2. Crear un canal
    const channel = await connection.createChannel();

    // 3. Asegurarse de que la cola existe
    await channel.assertQueue(queue);

    // 4. Enviar el mensaje a la cola
    channel.sendToQueue(queue, Buffer.from(message));

    // 5. Cerrar la conexión después de medio segundo
    setTimeout(() => {
      connection.close();
    }, 500);

    res.status(201).json({ message: "Message added to the queue" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
