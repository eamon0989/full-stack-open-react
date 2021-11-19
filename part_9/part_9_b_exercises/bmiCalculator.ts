// The BMI is defined as the body mass divided by the square of the body height,
// BMI = kg/m2

interface CalculateValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  height = height / 100;
  const BMI: number = (weight / height) / height;

  if (BMI < 18.5) {
    return 'Underweight';
  } else if (BMI > 24.9) {
    return 'Overweight';
  } else {
    return 'Normal (healthy weight)';
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

