import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.json({
      error: "malformatted parameters"
    });
  }

  const json = {
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight))
  };
  res.json(json);
});

app.post('/exercise', (req, res) => {
  const { daily_exercises, target } = req.body;
  console.log(daily_exercises, target);

  if (!daily_exercises || !target) {
    res.json({
      error: "parameters missing"
    });
  }

  res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});