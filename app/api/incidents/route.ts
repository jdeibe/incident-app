import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Incident } from "@/lib/models/incident";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    
    // Sorting parameters
    const sortField = searchParams.get("sortField") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Build sort object
    const sortQuery = { [sortField]: sortOrder === "desc" ? -1 : 1 };

    // Fetch incidents with pagination and sorting
    const [incidents, total] = await Promise.all([
      Incident.find()
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
      Incident.countDocuments(),
    ]);

    return NextResponse.json({
      incidents,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("GET Incidents Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.customerName || !body.description) {
      return NextResponse.json(
        { error: "Customer name and description are required" },
        { status: 400 }
      );
    }

    const incident = await Incident.create(body);
    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    console.error("POST Incident Error:", error);
    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 }
    );
  }
} 