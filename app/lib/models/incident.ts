import mongoose, { Schema, Document } from 'mongoose';

export interface IIncident extends Document {
  _id: string;
  customerName: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const IncidentSchema = new Schema<IIncident>(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      minlength: [2, 'Customer name must be at least 2 characters long'],
      maxlength: [100, 'Customer name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid priority level',
      },
      default: 'medium',
    },
    status: {
      type: String,
      enum: {
        values: ['open', 'in-progress', 'resolved', 'closed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
export const Incident = (mongoose.models.Incident as mongoose.Model<IIncident>) || 
  mongoose.model<IIncident>('Incident', IncidentSchema); 