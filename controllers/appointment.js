const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');


const getAllAppointment = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('appointments').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);

        });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
const getAppointmentById = async (req, res) => {
    //#swagger.tags=['Users']
    const appointmentsId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('appointments').find({_id: appointmentsId });
        result.toArray().then((appointments) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(appointments[0]);
        });
        
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
const postAppointment = async (req, res) => {
    //#swagger.tags=['Users']
    const { appointment_id, patient_id, doctor_name, department, appointment_date, appointment_time, status, notes } = req.body;
    const appt = {
        appointment_id,
        patient_id,
        doctor_name,
        department,
        appointment_date,
        appointment_time,
        status,
        notes
    };

    if (!appointment_id || !patient_id || !doctor_name || !department || !appointment_date || !appointment_time || !status || !notes) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('appointments').insertOne(appt);
        res.status(200).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add new appointment' });
    }
};

const putAppointment = async (req, res) => {
    //#swagger.tags=['Users']
    const appointmentsId = new ObjectId(req.params.id);
    console.log(`Updating appointment with ID: ${appointmentsId}`, req.body); // Log incoming request data
    const { appointment_id, patient_id, doctor_name, department, appointment_date, appointment_time, status, notes } = req.body;
    const appt = {
        appointment_id,
        patient_id,
        doctor_name,
        department,
        appointment_date,
        appointment_time,
        status,
        notes
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('appointments').replaceOne({ _id: appointmentsId }, appt);
    if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Appointment updated successfully' });
    } else {
        console.error(`Failed to update appointment with ID: ${appointmentsId}`, response.error); // Log error
        res.status(500).json(response.error || 'Appointment not updated');
    }
};

const deleteAppointment = async (req, res) => {
    //#swagger.tags=['Users']
    const appointmentsId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('appointments').deleteOne({ _id: new ObjectId(appointmentsId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
};

module.exports = {
    getAllAppointment,
    getAppointmentById,
    postAppointment,
    putAppointment,
    deleteAppointment
};