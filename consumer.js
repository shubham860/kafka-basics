const {Kafka} = require("kafkajs");

const init = async () => {
    try{
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9092"]
        })

        const consumer = kafka.consumer({
            groupId: "my-app-consumer-group"
        })

        console.log("connecting....");
        await consumer.connect();
        console.log("connected!!!!!!");

        await consumer.subscribe({
            topic: "Users",
            fromBeginning: true
        })

        await consumer.run({
            partitionsConsumerConcurrently: 2,
            eachMessage: async result => console.log(`Msg ${result.message.value} on part ${result.partition}`)
        })

        console.log(`kafka consumer connected`);
        
    }
    catch(e){
        console.log(`something wrong happen ${e}`);
    }
    finally{
        // process.exit(0);
    }
}

init();
