import { IIncident } from "./models/incident";

interface ValidationConfig {
  field: keyof IIncident;
  minLength?: number;
  maxLength?: number;
  message?: (min: number, max: number) => string;
}

export type ValidationErrors = {
  [key: string]: string;
};

const validationRules: ValidationConfig[] = [
  {
    field: 'customerName',
    minLength: 2,
    maxLength: 100,
    message: (min, max) => `Customer name must be between ${min} and ${max} characters`
  },
  {
    field: 'description', 
    minLength: 10,
    maxLength: 1000,
    message: (min, max) => `Description must be between ${min} and ${max} characters`
  }
];

export const validateIncidentData = (data: Partial<IIncident>): ValidationErrors => {
  const errors: ValidationErrors = {};

  validationRules.forEach(({ field, minLength, maxLength, message }) => {
    const value = data[field];
    if (value !== undefined) {
      const length = value.toString().length;
      if ((minLength && length < minLength) || (maxLength && length > maxLength)) {
        errors[field] = message?.(minLength || 0, maxLength || 0) || 
          `Invalid ${field} length`;
      }
    }
  });

  return errors;
};