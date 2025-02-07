const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');


const getAllPatient = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('patients').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);

        });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
const getPatientById = async (req, res) => {
    //#swagger.tags=['Users']
    const patientsId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('patients').find({_id: patientsId });
        result.toArray().then((patients) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(patients[0]);
        });
        
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
const postPatient = async (req, res) => {
    //#swagger.tags=['Users']
    const { patient_id, name, age, gender, diagnosis, medications, last_visit, doctor_notes } = req.body;
    const patientInfo = {
        patient_id,
        name,
        age,
        gender,
        diagnosis,
        medications,
        last_visit,
        doctor_notes
    };

    if (!patient_id || !name || !age || !gender || !diagnosis || !medications || !last_visit || !doctor_notes) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('patients').insertOne(patientInfo);
        res.status(200).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add new patient' });
    }
};

const putPatient = async (req, res) => {
    //#swagger.tags=['Users']
    const patientsId = new ObjectId(req.params.id);
    console.log(`Updating user with ID: ${patientsId}`, req.body); // Log incoming request data
    const { patient_id, name, age, gender, diagnosis, medications, last_visit, doctor_notes } = req.body;
    const patientInfo = {
        patient_id,
        name,
        age,
        gender,
        diagnosis,
        medications,
        last_visit,
        doctor_notes
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('patients').replaceOne({ _id: patientsId }, patientInfo);
    if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Patient updated successfully' });
    } else {
        console.error(`Failed to update patient with ID: ${patientsId}`, response.error); // Log error
        res.status(500).json(response.error || 'Patient not updated');
    }
};

const deletePatient = async (req, res) => {
    //#swagger.tags=['Users']
    const patientsId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('patients').deleteOne({ _id: new ObjectId(patientsId) });

        if (result.deletedCount === 0) {
            return res.status(400).json({ error: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete patient' });
    }
};

module.exports = {
    getAllPatient,
    getPatientById,
    postPatient,
    putPatient,
    deletePatient
};