import React from "react";
import { Button } from "./ui/button";
import { IIncident } from "@/lib/models/incident";

interface IncidentFormProps {
  onSubmit: (data: Partial<IIncident>) => void;
  initialData?: Partial<IIncident>;
  isEditing?: boolean;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
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
          className="w-full rounded-md border border-gray-300 p-2"
          required
        />
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
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2"
          required
        />
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
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
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
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        {isEditing ? "Update Incident" : "Create Incident"}
      </Button>
    </form>
  );
}
