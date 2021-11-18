interface returnValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))