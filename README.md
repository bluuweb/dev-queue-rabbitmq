# Example queues and RabbitMQ with Node.js

Cuando configuras `await channel.assertQueue(queue);` en RabbitMQ, estás declarando una cola. Este paso es necesario para asegurarte de que la cola existe antes de enviar o recibir mensajes.

La configuración de pub/sub (publicación/suscripción) se realiza a nivel del intercambio (exchange).

## Explicación de Intercambios y Colas

- **Cola (Queue)**: Es un buffer que almacena mensajes hasta que son consumidos.
- **Intercambio (Exchange)**: Es el componente que recibe los mensajes de los productores y los dirige a las colas según ciertas reglas, llamadas enlaces (bindings).

### Tipos de Intercambios en RabbitMQ

Para configurar un sistema de pub/sub, debes trabajar con intercambios. RabbitMQ soporta varios tipos de intercambios:

1. **Direct Exchange**: Envía mensajes a las colas basándose en una clave de enrutamiento exacta.

```javascript
await channel.assertExchange("direct_logs", "direct", { durable: false });
```

2. **Fanout Exchange**: Envía mensajes a todas las colas enlazadas sin considerar la clave de enrutamiento.

```javascript
await channel.assertExchange("logs", "fanout", { durable: false });
```

3. **Topic Exchange**: Envía mensajes a las colas basándose en un patrón de la clave de enrutamiento.

```javascript
await channel.assertExchange("topic_logs", "topic", { durable: false });
```

4. **Headers Exchange**: Envía mensajes basándose en el contenido de los encabezados de los mensajes en lugar de la clave de enrutamiento.

```javascript
await channel.assertExchange("header_logs", "headers", { durable: false });
```
