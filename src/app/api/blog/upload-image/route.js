import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request) {
  try {
    // Check admin password
    const password = request.headers.get("x-admin-password");
    
    if (!password || password !== process.env.BLOG_ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const formData = await request.formData();
    const file = formData.get("image");
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${originalName}`;
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save to public/blog/images
    const path = join(process.cwd(), "public", "blog", "images", filename);
    await writeFile(path, buffer);
    
    // Return URL
    const imageUrl = `/blog/images/${filename}`;
    
    return NextResponse.json({ 
      success: true,
      imageUrl 
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}


