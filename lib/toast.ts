export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        recipientEmail: "blackdavidd24@gmail.com",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Email error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
