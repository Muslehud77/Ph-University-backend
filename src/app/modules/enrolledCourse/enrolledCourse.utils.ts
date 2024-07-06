export const calculateGradeAndPoints = (marks: number) => {
  const result = {
    grade: 'N/A',
    gradePoints: 0,
  };



  if (marks >= 0 && marks <= 19) {
    if (marks === 0) {
      result.grade = 'N/A';
      result.gradePoints = 0;
    } else {
      result.grade = 'F';
      result.gradePoints = 0.0;
    }
  } else if (marks >= 20 && marks <= 39) {
    result.grade = 'D';
    result.gradePoints = 1.0;
  } else if (marks >= 40 && marks <= 59) {
    result.grade = 'C';
    result.gradePoints = 2.0;
  } else if (marks >= 60 && marks <= 69) {
    result.grade = 'B-';
    result.gradePoints = 2.7;
  } else if (marks >= 70 && marks <= 79) {
    result.grade = 'B';
    result.gradePoints = 3.0;
  } else if (marks >= 80 && marks <= 89) {
    result.grade = 'A-';
    result.gradePoints = 3.7;
  } else if (marks >= 90 && marks <= 99) {
    result.grade = 'A';
    result.gradePoints = 4.0;
  } else if (marks === 100) {
    result.grade = 'A+';
    result.gradePoints = 4.0;
  }

  return result;
};
