import { IIncident } from "./models/incident";

export type ValidationErrors = {
  [key: string]: string;
};

export const validateIncidentData = (data: Partial<IIncident>): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (data.customerName !== undefined) {
    if (data.customerName.length < 2) {
      errors.customerName = 'Customer name must be at least 2 characters long';
    }
    if (data.customerName.length > 100) {
      errors.customerName = 'Customer name cannot exceed 100 characters';
    }
  }
  
  if (data.description !== undefined) {
    if (data.description.length < 10) {
      errors.description = 'Description must be at least 10 characters long';
    }
    if (data.description.length > 1000) {
      errors.description = 'Description cannot exceed 1000 characters';
    }
  }
  
  return errors;
}; 