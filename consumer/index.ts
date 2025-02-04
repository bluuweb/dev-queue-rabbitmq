import amqp from "amqplib";

async function consume(queue: string) {
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

    // 3. Declarar la cola
    await channel.assertQueue(queue);

    // 4. Consumir mensajes de la cola
    channel.consume(queue, (message) => {
      if (message) {
        console.log(`Message received: ${message.content.toString()}`);

        // 5. Reconocer el mensaje
        channel.ack(message);
      }
    });

    console.log(`Consumer 1 running on queue: ${queue}`);
  } catch (error) {
    console.log(error);
  }
}

consume("emails");
// consume("payments");
// consume("logs");
