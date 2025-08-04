import { NextRequest } from "next/server";

// Langflow API configuration
const LANGLOW_API_URL = process.env.LANGFLOW_API_URL || "http://localhost:7860";
const LANGLOW_API_KEY = process.env.LANGFLOW_API_KEY || "";
const LANGLOW_FLOW_ID =
  process.env.LANGFLOW_FLOW_ID || "5dd0543c-43de-48dd-9ca4-5bfb59286118";

export async function POST(req: NextRequest) {
  try {
    // Check for API key
    if (!LANGLOW_API_KEY) {
      throw new Error("LANGFLOW_API_KEY environment variable not found");
    }

    const { messages } = await req.json();

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage.content;

    // Prepare request for Langflow (simple format)
    const langflowRequest = {
      output_type: "chat",
      input_type: "chat",
      input_value: userInput,
      session_id: `scholar_chat_${Date.now()}`,
    };

    console.log("Calling Langflow with:", langflowRequest);

    // Call Langflow API directly
    const response = await fetch(
      `${LANGLOW_API_URL}/api/v1/run/${LANGLOW_FLOW_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": LANGLOW_API_KEY,
        },
        body: JSON.stringify(langflowRequest),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Langflow API error: ${response.status} ${response.statusText}`
      );
    }

    const langflowResponse = await response.json();
    console.log("Langflow raw response:", langflowResponse);

    // Extract message from Langflow response
    let messageContent = "";

    // Try to extract from outputs array (most common Langflow structure)
    if (langflowResponse.outputs && langflowResponse.outputs.length > 0) {
      const firstOutput = langflowResponse.outputs[0];
      console.log("First output:", firstOutput);

      if (firstOutput.outputs && firstOutput.outputs.length > 0) {
        console.log("First output.outputs:", firstOutput.outputs);
        // Look for text/message in the outputs
        for (const output of firstOutput.outputs) {
          console.log("Processing output:", output);

          // Try different paths where the message might be
          if (output.results?.message?.text) {
            messageContent = output.results.message.text;
            break;
          } else if (output.artifacts?.message) {
            messageContent = output.artifacts.message;
            break;
          } else if (output.outputs?.message?.message) {
            messageContent = output.outputs.message.message;
            break;
          } else if (output.messages && output.messages.length > 0) {
            messageContent = output.messages[0].message;
            break;
          } else if (output.text) {
            messageContent = output.text;
            break;
          } else if (output.message) {
            messageContent = output.message;
            break;
          } else if (output.content) {
            messageContent = output.content;
            break;
          } else if (typeof output === "string") {
            messageContent = output;
            break;
          }
        }
      }
    }

    // If no message found in outputs, try other common fields
    if (!messageContent) {
      if (langflowResponse.result?.message) {
        messageContent = langflowResponse.result.message;
      } else if (langflowResponse.result?.text) {
        messageContent = langflowResponse.result.text;
      } else if (langflowResponse.message) {
        messageContent = langflowResponse.message;
      } else if (langflowResponse.text) {
        messageContent = langflowResponse.text;
      } else if (typeof langflowResponse.result === "string") {
        messageContent = langflowResponse.result;
      }
    }

    // If still no message, provide a fallback
    if (!messageContent) {
      console.error(
        "Could not extract message from Langflow response:",
        langflowResponse
      );
      messageContent =
        "I received a response from my knowledge base but couldn't parse it properly. Please try asking your question in a different way.";
    }

    console.log("Extracted message content:", messageContent);

    // Return the complete response in JSON format that useChat expects
    return new Response(
      JSON.stringify({
        id: Date.now().toString(),
        role: "assistant",
        content: messageContent,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);

    // Fallback response if Langflow is unavailable
    return new Response(
      JSON.stringify({
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I'm having trouble connecting to my knowledge base right now. Please try again in a moment or contact support if the issue persists.",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
