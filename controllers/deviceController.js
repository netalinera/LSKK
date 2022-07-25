import Device from "../models/Device.js"
import History from "../models/History.js"
import mqtt from "mqtt"
import moment from "moment"

export const getDevices = async (req, res)=>{
    Device.find()
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send({
                message: error.message || "some error"
            });
        });
}

export const createDevices = async (req, res) =>{
    const device = new Device({
        title: req.body.title,
        body: req.body.body
    })
    device.save() 
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(409).send({
                message: error.message || "some create error"
            });
        });
}

export const updateDevices = async (req, res)=>{
    Device.updateOne({_id: req.params.id}, {$set: req.body})
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(400).send({
            message: error.message || "some update error"
        });
    });
}

export const deleteDevices = async (req, res)=>{
    Device.deleteOne({_id: req.params.id})
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(404).send({
            message: error.message || "some update error"
        });
    });
}

export const getDevicesById = async (req, res)=>{
    Device.findById(req.params.id)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send({
                message: error.message || "some error"
            });
        });
}

export const getapi= async (req, res)=>{
    const host = 'rmq2.pptik.id'
    const port = '1883'
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

    const connectUrl = `mqtt://${host}:${port}`
    const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: '/mahasiswaubl:ubliot',
        password: 'qwerty1245',
        reconnectPeriod: 1000,
        })

    const topic = 'homeautoLSKK'
        client.on('connect', () => {
        console.log('Connected')
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`)
        })
        console.log(req.body)
        console.log(req.body.data)
        client.publish(topic, req.body.data, { qos: 0, retain: false }, (error) => {
                //simpan ke historys
                const history = new History({
                    data: req.body.data,
                    time: moment().format('MMMM Do YYYY, h:mm:ss a')
                });
                history.save()
                //if succes -> return success
                if (error) {
                    res.send("An error occurred during publish");
                } else {
                    //console.log("Published successfully to " + topic.toString())
                    res.send({data: "successs"});
                }
            })
        })
  

        client.on("error", function (error) {
           res.send("Error: " + error);
        });

        // reconnection
        client.on("reconnect", function () {
           res.send("Reconnection starting");
        });

        // offline status
        client.on("offline", function () {
           res.send("Device's offline. Please check the internet!");
        });
    
}
