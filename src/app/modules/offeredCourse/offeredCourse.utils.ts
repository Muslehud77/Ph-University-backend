import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAssignedSchedules, TNewSchedules } from './offeredCourse.interface';

export const hasConflict = (
  assignedSchedules: TAssignedSchedules,
  newSchedules: TNewSchedules,
  operation: string,
) => {
  console.log(assignedSchedules);

  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule?.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule?.endTime}`);
    const newStartingTime = new Date(`1970-01-01T${newSchedules.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`);

    if (
      operation === 'UPDATE' &&
      newStartingTime === existingStartTime &&
      newEndTime === existingEndTime
    ) {
      console.log('hello 1');
      return false;
    }

    if (
      (operation === 'UPDATE' || operation === 'CREATE') &&
      newStartingTime < existingEndTime &&
      newEndTime > existingStartTime
    ) {
      console.log('hello 2');
      return true;
    }
  }

  return false;
};

export const validate = (
  query: Record<string, unknown>,
  name: string,
  custom: string,
) => {
  if (!query) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      custom || `${name} does not exists!`,
    );
  }
};
