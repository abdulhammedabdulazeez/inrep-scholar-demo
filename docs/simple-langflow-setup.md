# Simple Langflow Integration Setup

## Quick Setup Guide

### 1. Environment Variables

Add to your `.env.local`:

```bash
# Langflow Configuration
LANGFLOW_API_URL=http://localhost:7860
LANGFLOW_API_KEY=your_langflow_api_key
LANGFLOW_FLOW_ID=your_flow_id_here
```

### 2. Get Your Flow ID

1. Go to your Langflow UI (`http://localhost:7860`)
2. Open your RAG flow
3. Copy the flow ID from the URL or flow settings
4. Update `LANGFLOW_FLOW_ID` in your `.env.local`

### 3. Get Your API Key

1. In Langflow UI, go to Settings → API Keys
2. Generate a new API key
3. Add it to `LANGFLOW_API_KEY` in your `.env.local`

### 4. Test the Integration

```bash
# Test your API route
curl -X POST http://localhost:3000/api/scholar-chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "What is this document about?"
      }
    ]
  }'
```

### 5. Test in Your App

1. Start your app: `bun run dev`
2. Go to `/demo/alu/admin`
3. Click "Ask Scholar" button
4. Ask a question about your uploaded PDF

## How It Works

1. **User types a question** in the chat interface
2. **useChat hook** sends the message to `/api/scholar-chat`
3. **API route** calls your Langflow flow with:
   ```json
   {
     "output_type": "chat",
     "input_type": "chat", 
     "input_value": "User's question",
     "session_id": "unique_session_id"
   }
   ```
4. **Langflow** processes the question against your PDF knowledge base
5. **Response** is returned to the chat interface

## Troubleshooting

### Common Issues:

**"LANGFLOW_API_KEY environment variable not found"**
- Check your `.env.local` file
- Restart your development server

**"Langflow API error: 404"**
- Verify your flow ID is correct
- Check if the flow is published/deployed

**"Langflow API error: 401"**
- Verify your API key is correct
- Check API key permissions

**"Langflow API error: 500"**
- Check Langflow server logs
- Verify your flow is working in Langflow UI

## Flow Requirements

Your Langflow flow should:
- Accept `input_value` as the user's question
- Return `result.message` as the response
- Be published/deployed to be accessible via API

That's it! Simple and direct integration with your RAG flow. 