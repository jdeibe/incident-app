import React from "react";
import { Button } from "./ui/button";
import { IIncident } from "@/lib/models/incident";
import { validateIncidentData } from '@/lib/validation';

interface IncidentFormProps {
  onSubmit: (data: Partial<IIncident>) => void;
  initialData?: Partial<IIncident>;
  isEditing?: boolean;
}

interface ValidationErrors {
  customerName?: string;
  description?: string;
  priority?: string;
  status?: string;
  general?: string;
}

export function IncidentForm({
  onSubmit,
  initialData,
  isEditing = false,
}: IncidentFormProps) {
  const [formData, setFormData] = React.useState({
    customerName: initialData?.customerName || "",
    description: initialData?.description || "",
    priority: initialData?.priority || "medium",
    status: initialData?.status || "open",
  });

  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validateField = async (name: string, value: string) => {
    const fieldData = { [name]: value };
    const validationErrors = validateIncidentData(fieldData);
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name as keyof ValidationErrors]
    }));
    return !validationErrors[name as keyof ValidationErrors];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateIncidentData(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    await validateField(name, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      {errors.general && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.general}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="customerName" className="block text-sm font-medium">
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full rounded-md border p-2 ${
            errors.customerName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.customerName && touched.customerName && (
          <p className="text-red-500 text-sm">{errors.customerName}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className={`w-full rounded-md border p-2 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && touched.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="priority" className="block text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-md border p-2 ${
              errors.priority ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && touched.priority && (
            <p className="text-red-500 text-sm">{errors.priority}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-md border p-2 ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && touched.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        {isEditing ? "Update Incident" : "Create Incident"}
      </Button>
    </form>
  );
}
