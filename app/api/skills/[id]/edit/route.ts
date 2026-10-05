import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const skillId = parseInt(id, 10);

    if (Number.isNaN(skillId)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
    }

    // Get authentication token
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify logged-in user
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find existing skill
    const existingSkill = await prisma.skill.findUnique({
      where: {
        id: skillId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!existingSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    // Only owner can edit
    if (existingSkill.authorId !== payload.userId) {
      return NextResponse.json(
        { error: "Not authorized to edit this skill" },
        { status: 403 },
      );
    }

    // Get request data
    const body = await request.json();

    const { name, description, content, isPublic } = body;

    // Validate fields
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof content !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Name, description and content are required",
        },
        { status: 400 },
      );
    }

    if (!name.trim() || !description.trim() || !content.trim()) {
      return NextResponse.json(
        {
          error: "Name, description and content cannot be empty",
        },
        { status: 400 },
      );
    }

    if (typeof isPublic !== "boolean") {
      return NextResponse.json(
        {
          error: "isPublic must be a boolean",
        },
        { status: 400 },
      );
    }

    // Update skill
    const updatedSkill = await prisma.skill.update({
      where: {
        id: skillId,
      },
      data: {
        name: name.trim(),
        description: description.trim(),
        content: content.trim(),
        isPublic,
      },
      select: {
        id: true,
        name: true,
        description: true,
        content: true,
        isPublic: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
