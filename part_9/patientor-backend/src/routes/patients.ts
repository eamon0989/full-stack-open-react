import express from 'express';
// import patients from '../../data/patients';
import patientService from '../services/patientService';
// import { newPatient } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);

  // const  = req.body;
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;