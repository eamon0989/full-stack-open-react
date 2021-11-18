// The BMI is defined as the body mass divided by the square of the body height,
// BMI = kg/m2

const calculateBmi = (height: number, weight: number): string => {
  height = height / 100;
  const BMI: number = (weight / height) / height;

  if (BMI < 18.5) {
    return 'Underweight';
  } else if (BMI > 24.9) {
    return 'Overweight';
  } else {
    return 'Normal (healthy weight)';
  }
}

console.log(calculateBmi(180, 74))
