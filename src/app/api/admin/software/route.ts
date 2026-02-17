import { NextRequest, NextResponse } from "next/server";
import {
    getSoftwareData,
    addSoftwareData,
    updateSoftwareData,
    deleteSoftwareData
} from "@/lib/data-store";

// GET - Fetch all custom software from Firestore
export async function GET() {
    try {
        const software = await getSoftwareData();
        return NextResponse.json({ software });
    } catch (error) {
        console.error("Error reading software data:", error);
        return NextResponse.json(
            { error: "Failed to fetch software data" },
            { status: 500 }
        );
    }
}

// POST - Add new software to Firestore
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, category, tags, formLink, paymentLink, image } = body;

        // Validation
        if (!name || !description || !category) {
            return NextResponse.json(
                { error: "Name, description, and category are required" },
                { status: 400 }
            );
        }

        // Fetch current software to generate a new numeric ID (for compatibility)
        const software = await getSoftwareData();
        const existingIds = software.map((s: any) => s.id);
        const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1000;

        // Create new software entry
        const newSoftware = {
            id: newId,
            title: name,
            category: category,
            description,
            image: image || "/projects/custom.jpg",
            tags: tags || ["Custom", "Software", "Solution"],
            color: "from-cyan-500 to-blue-500",
            formLink: formLink || "",
            paymentLink: paymentLink || "",
            stats: {
                metric: name.split(" ")[0],
                label: "Software"
            }
        };

        // Save to Firestore
        const savedSoftware = await addSoftwareData(newSoftware);

        return NextResponse.json({
            success: true,
            software: savedSoftware
        });
    } catch (error) {
        console.error("Error adding software:", error);
        return NextResponse.json(
            { error: "Failed to add software" },
            { status: 500 }
        );
    }
}

// PUT - Update existing software in Firestore
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, description, category, tags, formLink, paymentLink } = body;

        // Validation
        if (!id || !name || !description) {
            return NextResponse.json(
                { error: "ID, name, and description are required" },
                { status: 400 }
            );
        }

        const softwareId = typeof id === 'string' ? parseInt(id) : id;

        // Prevent editing hardcoded software (ID < 1000)
        if (softwareId < 1000) {
            return NextResponse.json(
                { error: "Cannot edit hardcoded software entries" },
                { status: 403 }
            );
        }

        // Update in Firestore
        const updateData: any = {
            title: name,
            description
        };

        if (category) updateData.category = category;
        if (tags) updateData.tags = tags;
        if (formLink !== undefined) updateData.formLink = formLink;
        if (paymentLink !== undefined) updateData.paymentLink = paymentLink;

        await updateSoftwareData(softwareId, updateData);

        return NextResponse.json({
            success: true,
            id: softwareId
        });
    } catch (error) {
        console.error("Error updating software:", error);
        return NextResponse.json(
            { error: "Failed to update software" },
            { status: 500 }
        );
    }
}

// DELETE - Remove software by ID from Firestore
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Validate ID parameter
        if (!id) {
            return NextResponse.json(
                { error: "ID parameter is required" },
                { status: 400 }
            );
        }

        const softwareId = parseInt(id);

        // Prevent deletion of hardcoded software (ID < 1000)
        if (softwareId < 1000) {
            return NextResponse.json(
                { error: "Cannot delete hardcoded software entries" },
                { status: 403 }
            );
        }

        // Delete from Firestore
        await deleteSoftwareData(softwareId);

        return NextResponse.json({
            success: true,
            id: softwareId
        });
    } catch (error) {
        console.error("Error deleting software:", error);
        return NextResponse.json(
            { error: "Failed to delete software" },
            { status: 500 }
        );
    }
}

