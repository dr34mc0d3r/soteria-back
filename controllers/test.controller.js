const Test = require("../models/test.model");

var IncidentArray = require("../data/incidentsMany");


exports.testInsertMany = async (req, res) => {
    var start = new Date();
    try {
        var counter = 0;
        IncidentArray.forEach(async function (item) {
            counter++;
            // console.log('---------------customerId--------------------', counter, item.customerId);
            let testDoc = new Test(item);
            await testDoc.save();
        })
        var time = new Date() - start;

        return res.status(200).json({
            success: true,
            count: counter,
            timeMilliSec: time
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            count: 0,
            data: error
        });
    }
};



exports.testInsertMany5x = async (req, res) => {
    var start = new Date();
    try {
        var counter = 0;
        var i = 0;
        while (i < 5) {
            console.log(i);



            IncidentArray.forEach(async function (item) {
                counter++;
                // console.log('---------------customerId--------------------', counter, item.customerId);
                let testDoc = new Test(item);
                await testDoc.save();
            })

            await new Promise(resolve => setTimeout(resolve, 10000));

            i++;
        }



        var time = new Date() - start;

        return res.status(200).json({
            success: true,
            count: counter,
            timeMilliSec: time
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            count: 0,
            data: error
        });
    }
};





exports.testCount = function (req, res) {
    Test.countDocuments({}, function (err, result) {

        if (err) {
            console.log('err----------------------------------------------', err);
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
};




exports.testInsert = async (req, res) => {
    var requestBody = {};
    requestBody = req.body;

    try {
        let testDoc = new Test(requestBody);
        await testDoc.save();
        return res.status(200).json({
            success: true,
            count: testDoc.length,
            data: testDoc
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            count: 0,
            data: error
        });
    }
};

exports.testList = async (req, res, next) => {

    try {
        const data = await Test.find();
        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            count: 0,
            data: error
        });
    }
};

exports.testFind = async (req, res) => {
    var start = new Date();
    // const id = req.params.id;
    try {
        let data = await Test.find({
            customerId: "test123"
        });

        var time = new Date() - start;
        console.log('-------------------------------------Execution time in milliseconds: ', time);

        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        console.log('-----------ERROR-------------', error);
        return res.status(500).json({
            success: false,
            count: 0,
            data: error
        });
    }
};


exports.testFindNested = async (req, res) => {
    var start = new Date();
    // const id = req.params.id;
    try {

        // dee9b44d-4fc9-41c5-9216-745d45eda596
        let data = await Test.find({'customerId':"dee9b44cddd-4fc9-41c5-9216-745d45eda596"});
        // let data = await Test.find({'customerId':"ddd-ddd-chris", 'atOrNear.typeParameterId': "142" });
        // make into an AND query  dd = 99 AND ff = iii --- both in the index

        var time = new Date() - start;
        console.log('-------------------------------------Execution time in milliseconds: ', time);

        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        console.log('-----------ERROR-------------', error);
        return res.status(500).json({
            success: false,
            count: 0,
            data: error
        });
    }
};