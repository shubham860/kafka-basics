const {Kafka} = require("kafkajs");

const init = async () => {
    try{
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9092"]
        })

        const admin = kafka.admin();

        console.log("connecting....");
        await admin.connect();
        console.log("connected!!!!!!");

        await admin.createTopics({
            topics: [{
                topic: "Users",
                numPartitions: 2
            }]
        })
        
        console.log("topic created......");

        await admin.disconnect();
        
        console.log("kafka disconnected...")
    }
    catch(e){
        console.log(`something wrong happen ${e}`);
    }
    finally{
        process.exit(0);
    }
}

init();
