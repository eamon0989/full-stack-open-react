interface returnValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

interface CalculateValues {
  target: number,
  dailyHours: Array<number>
}

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const array: Array<string> = args.slice(2);
  const numArray: Array<number> = array.map(Number);


  if (numArray.every(num => !isNaN(num))) {
    return {
      target: numArray[0],
      dailyHours: numArray.slice(1)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (dailyHours: Array<number>, target: number): returnValues => {
  const average: number = dailyHours.reduce((acc, num) => acc + num, 0) / dailyHours.length; 
  let rating: number;
  let ratingDescription: string;

  if (average > target) {
    rating = 3;
    ratingDescription = 'Great job';
  } else if (average < (target / 2)) {
    rating = 1;
    ratingDescription = 'That was terrible';
  } else {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }

  return { 
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(num => num).length,
    success: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average 
  }
}

try {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}