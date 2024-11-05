import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Incident } from "@/lib/models/incident";
import mongoose from "mongoose";

// Utility function to validate MongoDB ObjectId
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(
  request: Request,
  context: { params: { incidentId: string } }
) {
  try {
    const { incidentId } = await context.params; // Await the params

    if (!isValidObjectId(incidentId)) {
      return NextResponse.json(
        { error: "Invalid incident ID format" },
        { status: 400 }
      );
    }

    await connectDB();
    const incident = await Incident.findById(incidentId).lean();

    if (!incident) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(incident);
  } catch (error) {
    console.error("GET Incident Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch incident" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { incidentId: string } }
) {
  try {
    const { incidentId } = await context.params; // Await the params

    if (!isValidObjectId(incidentId)) {
      return NextResponse.json(
        { error: "Invalid incident ID format" },
        { status: 400 }
      );
    }

    await connectDB();
    const body = await request.json();

    const incident = await Incident.findByIdAndUpdate(
      incidentId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!incident) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(incident);
  } catch (error) {
    console.error("PUT Incident Error:", error);
    return NextResponse.json(
      { error: "Failed to update incident" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { incidentId: string } }
) {
  try {
    const { incidentId } = await context.params; // Await the params

    if (!isValidObjectId(incidentId)) {
      return NextResponse.json(
        { error: "Invalid incident ID format" },
        { status: 400 }
      );
    }

    await connectDB();
    const incident = await Incident.findByIdAndDelete(incidentId);

    if (!incident) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Incident deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Incident Error:", error);
    return NextResponse.json(
      { error: "Failed to delete incident" },
      { status: 500 }
    );
  }
} 