export async function onRequest(context) {
  const { request } = context

  // Only handle POST requests
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    // Parse form data
    const formData = await request.formData()
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Validate form data
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All fields are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Here you would typically send an email or store the contact request
    // For this example, we'll just return a success response

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message. I'll get back to you soon!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

