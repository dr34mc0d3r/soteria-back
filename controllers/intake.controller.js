const Validator = require('fastest-validator');
const models = require('../models');

function save(req, res){
    const intake = {
        vrnumber: req.body.vrnumber,
        fname: req.body.fname,
        lname: req.body.lname,
        assignedTo: req.body.assignedTo,
        modifiedBy: req.body.modifiedBy
    }

    const schema = {
        vrnumber: {type:"string", optional: false, max: "25"},
        fname: {type: "string", optional: false, max: "25"},
        lname: {type: "string", optional: false, max: "25"},
        assignedTo: {type: "number", optional: false},
        modifiedBy: {type: "number", optional: false}
    }
    
    const v = new Validator();
    const validationResponse = v.validate(intake, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }
    
    models.Intake.create(intake).then(result => {
        res.status(201).json({
            message: "Intake created successfully",
            intake: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function show(req, res){
    const id = req.params.id;

    models.Intake.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Intake not found!"
            }) 
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}


function index(req, res){
    models.Intake.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}


function update(req, res){
    const id = req.params.id;
    const updatedIntake = {
        vrnumber: req.body.vrnumber,
        fname: req.body.fname,
        lname: req.body.lname,
        assignedTo: req.body.assignedTo,
        modifiedBy: req.body.modifiedBy,
    }
    
    const assignedTo = req.body.assignedTo;

    const schema = {
        vrnumber: {type:"string", optional: false, max: "25"},
        fname: {type: "string", optional: false, max: "25"},
        lname: {type: "string", optional: false, max: "25"},
        assignedTo: {type: "number", optional: false},
        modifiedBy: {type: "number", optional: false}
    }
    
    const v = new Validator();
    const validationResponse = v.validate(updatedIntake, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Intake.update(updatedIntake, {where: {id:id, assignedTo: assignedTo}}).then(result => {
        res.status(200).json({
            message: "Intake updated successfully",
            intake: updatedIntake
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    })
}


function destroy(req, res){
    const id = req.params.id;
    const assignedTo = req.params.assignedTo;

    models.Intake.destroy({where:{id:id, assignedTo:assignedTo}}).then(result => {
        res.status(200).json({
            message: "Intake deleted successfully"
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    });
}

 
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}
