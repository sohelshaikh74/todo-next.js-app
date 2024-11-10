// this route file will create the functionality to create the customerr handler for the HTTP methods

// password = FLb0ma9TkSimGpsd
// username =globostack

import { ConnectDb } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDb();
};
LoadDB();
// eg get post put ptach and delete
export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos: todos });
}

export async function POST(request) {
  try {
    // Parse the request body to extract title and description
    const { title, description } = await request.json();

    // Check if title and description are provided
    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    // Create the new todo item in the database
    const todo = await TodoModel.create({
      title,
      description,
    });

    // If the todo is created successfully, return a success response
    return NextResponse.json({ message: "Todo Created", todo });
  } catch (error) {
    console.error("Error creating todo:", error); // Log the error to the server console
    return NextResponse.json(
      { message: "Error creating todo", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongo");
  await TodoModel.findByIdAndDelete(mongoId);
  return NextResponse.json({ message: "Todo Delete" });
}
export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongo");
  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });
  return NextResponse.json({ message: "Todo Completed" });
}
