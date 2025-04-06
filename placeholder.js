export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)
  const path = url.pathname.split("/")

  // Check if a specific image is requested
  if (path.length > 3 && path[3]) {
    const imageName = path[3]

    // Define image URLs based on requested name
    const imageMap = {
      finance: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop",
      nyc: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop",
      weather: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=600&auto=format&fit=crop",
      "coming-soon": "https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?q=80&w=600&auto=format&fit=crop",
    }

    // If the requested image exists in our map, redirect to it
    if (imageMap[imageName]) {
      return Response.redirect(imageMap[imageName], 302)
    }
  }

  // Default placeholder behavior if no specific image is requested
  const width = path.length > 3 ? path[3] : 300
  const height = path.length > 4 ? path[4] : 200

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
        ${width}x${height}
      </text>
    </svg>
  `

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000",
    },
  })
}

