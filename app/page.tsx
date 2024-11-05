"use client";

import { useState, useEffect, useCallback } from "react";
import { IncidentGrid } from "./components/IncidentGrid";
import { IncidentForm } from "./components/IncidentForm";
import { Button } from "./components/ui/button";
import { IIncident } from "@/lib/models/incident";

export default function Home() {
  const [incidents, setIncidents] = useState<IIncident[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
    limit: 10,
  });
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState<IIncident | null>(
    null
  );

  const fetchIncidents = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortField,
        sortOrder,
      });

      const response = await fetch(`/api/incidents?${queryParams}`);
      const data = await response.json();

      setIncidents(data.incidents);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  }, [pagination.page, pagination.limit, sortField, sortOrder]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const handleSubmit = async (formData: Partial<IIncident>) => {
    try {
      if (editingIncident) {
        await fetch(`/api/incidents/${editingIncident._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("/api/incidents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      fetchIncidents();
      setIsFormOpen(false);
      setEditingIncident(null);
    } catch (error) {
      console.error("Error saving incident:", error);
    }
  };

  const handleEdit = (incident: IIncident) => {
    setEditingIncident(incident);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/incidents/${id}`, {
        method: "DELETE",
      });
      fetchIncidents();
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  const handleSort = (field: string) => {
    setSortOrder((prev) =>
      field === sortField ? (prev === "asc" ? "desc" : "asc") : "desc"
    );
    setSortField(field);
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Incident Management</h1>
        <Button onClick={() => setIsFormOpen(true)}>Create New Incident</Button>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingIncident ? "Edit Incident" : "Create New Incident"}
          </h2>
          <IncidentForm
            onSubmit={handleSubmit}
            initialData={editingIncident || undefined}
            isEditing={!!editingIncident}
          />
        </div>
      )}

      <IncidentGrid
        incidents={incidents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={pagination}
        onSort={handleSort}
        onPageChange={handlePageChange}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </main>
  );
}
