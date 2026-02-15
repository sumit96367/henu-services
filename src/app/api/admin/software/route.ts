import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "software.json");

// Ensure data directory and file exist
function ensureDataFile() {
    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ software: [] }, null, 2));
    }
}

// GET - Fetch all custom software
export async function GET() {
    try {
        ensureDataFile();
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        const jsonData = JSON.parse(data);

        return NextResponse.json({ software: jsonData.software || [] });
    } catch (error) {
        console.error("Error reading software data:", error);
        return NextResponse.json(
            { error: "Failed to fetch software data" },
            { status: 500 }
        );
    }
}

// POST - Add new software
export async function POST(request: NextRequest) {
    try {
        ensureDataFile();

        const body = await request.json();
        const { name, description, category, tags, formLink, paymentLink, image } = body;

        // Validation
        if (!name || !description || !category) {
            return NextResponse.json(
                { error: "Name, description, and category are required" },
                { status: 400 }
            );
        }

        // Read current data
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        const jsonData = JSON.parse(data);

        // Generate new ID
        const existingIds = jsonData.software.map((s: any) => s.id);
        const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1000;

        // Create new software entry
        const newSoftware = {
            id: newId,
            title: name,
            category: category,
            description,
            image: image || "/projects/custom.jpg",
            tags: tags || ["Custom", "Software", "Solution"],
            color: "from-cyan-500 to-blue-500", // Keep for backward compatibility
            formLink: formLink || "",
            paymentLink: paymentLink || "",
            stats: {
                metric: name.split(" ")[0],
                label: "Software"
            }
        };

        // Add to array
        jsonData.software.push(newSoftware);

        // Write back to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({
            success: true,
            software: newSoftware
        });
    } catch (error) {
        console.error("Error adding software:", error);
        return NextResponse.json(
            { error: "Failed to add software" },
            { status: 500 }
        );
    }
}

// PUT - Update existing software
export async function PUT(request: NextRequest) {
    try {
        ensureDataFile();

        const body = await request.json();
        const { id, name, description, category, tags, formLink, paymentLink } = body;

        // Validation
        if (!id || !name || !description) {
            return NextResponse.json(
                { error: "ID, name, and description are required" },
                { status: 400 }
            );
        }

        const softwareId = parseInt(id);

        // Prevent editing hardcoded software (ID < 1000)
        if (softwareId < 1000) {
            return NextResponse.json(
                { error: "Cannot edit hardcoded software entries" },
                { status: 403 }
            );
        }

        // Read current data
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        const jsonData = JSON.parse(data);

        // Find the software to update
        const softwareIndex = jsonData.software.findIndex(
            (s: any) => s.id === softwareId
        );

        if (softwareIndex === -1) {
            return NextResponse.json(
                { error: "Software not found" },
                { status: 404 }
            );
        }

        // Update the software entry
        const updatedSoftware = {
            ...jsonData.software[softwareIndex],
            title: name,
            description,
            category: category || jsonData.software[softwareIndex].category,
            tags: tags || jsonData.software[softwareIndex].tags,
            formLink: formLink !== undefined ? formLink : jsonData.software[softwareIndex].formLink || "",
            paymentLink: paymentLink !== undefined ? paymentLink : jsonData.software[softwareIndex].paymentLink || "",
        };

        jsonData.software[softwareIndex] = updatedSoftware;

        // Save updated data
        fs.writeFileSync(DATA_FILE, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({
            success: true,
            software: updatedSoftware
        });
    } catch (error) {
        console.error("Error updating software:", error);
        return NextResponse.json(
            { error: "Failed to update software" },
            { status: 500 }
        );
    }
}

// DELETE - Remove software by ID
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

        ensureDataFile();

        // Read current data
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        const jsonData = JSON.parse(data);

        // Find the software to delete
        const softwareIndex = jsonData.software.findIndex(
            (s: any) => s.id === softwareId
        );

        if (softwareIndex === -1) {
            return NextResponse.json(
                { error: "Software not found" },
                { status: 404 }
            );
        }

        // Remove the software
        const deletedSoftware = jsonData.software[softwareIndex];
        jsonData.software.splice(softwareIndex, 1);

        // Save updated data
        fs.writeFileSync(DATA_FILE, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({
            success: true,
            deleted: deletedSoftware
        });
    } catch (error) {
        console.error("Error deleting software:", error);
        return NextResponse.json(
            { error: "Failed to delete software" },
            { status: 500 }
        );
    }
}
