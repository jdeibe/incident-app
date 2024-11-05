import React from "react";
import { Button } from "./ui/button";
import { IIncident } from "@/lib/models/incident";
import { Edit2, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface IncidentGridProps {
  incidents: IIncident[];
  onEdit: (incident: IIncident) => void;
  onDelete: (id: string) => void;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  onSort: (field: string) => void;
  onPageChange: (page: number) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
}

export function IncidentGrid({
  incidents,
  onEdit,
  onDelete,
  pagination,
  onSort,
  onPageChange,
  sortField,
  sortOrder,
}: IncidentGridProps) {
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline-block ml-1" />
    );
  };

  const renderColumnHeader = (field: string, label: string) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => onSort(field)}
    >
      <span className="flex items-center">
        {label}
        {renderSortIcon(field)}
      </span>
    </th>
  );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {renderColumnHeader("customerName", "Customer Name")}
              {renderColumnHeader("description", "Description")}
              {renderColumnHeader("priority", "Priority")}
              {renderColumnHeader("status", "Status")}
              {renderColumnHeader("createdAt", "Created At")}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map((incident) => (
              <tr key={incident._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {incident.customerName}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="max-w-xs truncate">
                    {incident.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      incident.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : incident.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {incident.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      incident.status === "open"
                        ? "bg-blue-100 text-blue-800"
                        : incident.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : incident.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {incident.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(incident.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(incident)}
                    className="mr-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(incident._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} results
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
