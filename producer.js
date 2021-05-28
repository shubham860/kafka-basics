const {Kafka} = require("kafkajs");
const msg = process.argv[2];
console.log("@@@@@@@@@@@@@@@@@@@@@msg", msg)
const init = async () => {
    try{
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9092"]
        })

        const producer = kafka.producer();

        console.log("connecting....");
        await producer.connect();
        console.log("connected!!!!!!");

        const partitions = msg[0] < "N" ? 0 : 1;

        const result = await producer.send({
            topic: "Users",
            messages: [{
                value: msg,
                partitions
            }]
        })

        console.log(`send succesfully ${JSON.stringify(result)}`);

        await producer.disconnect();
        
    }
    catch(e){
        console.log(`something wrong happen ${e}`);
    }
    finally{
        process.exit(0);
    }
}

init();
