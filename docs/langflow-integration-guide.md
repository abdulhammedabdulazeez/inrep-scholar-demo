# Langflow Integration Guide
## Connecting Scholar AI Chat to Langflow Backend

---

## Prerequisites

- ✅ Langflow server running (typically on `http://localhost:7860`)
- ✅ Langflow API key configured
- ✅ Knowledge base uploaded to Langflow
- ✅ Chat flow configured in Langflow

---

## Step 1: Environment Configuration

### Create `.env.local` file in your project root:

```bash
# Supabase Configuration (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Langflow API Configuration (new)
LANGFLOW_API_URL=http://localhost:7860
LANGFLOW_API_KEY=your_langflow_api_key
```

### Get Your Langflow API Key:

1. **Access Langflow UI**: Go to `http://localhost:7860`
2. **Navigate to Settings**: Click on your profile → Settings
3. **API Keys**: Go to API Keys section
4. **Generate Key**: Create a new API key
5. **Copy Key**: Save the key securely

---

## Step 2: Langflow Flow Configuration

### Required Inputs for Your Langflow Flow:

Your Langflow flow should accept these inputs:

```json
{
  "message": "User's question",
  "session_id": "Unique session identifier",
  "inputs": {
    "user_role": "admin|regular|reviewer|guest",
    "university_name": "University name",
    "university_subdomain": "University subdomain"
  }
}
```

### Expected Output Format:

```json
{
  "result": {
    "message": "AI response text",
    "session_id": "Session identifier"
  }
}
```

---

## Step 3: Testing the Integration

### Test Langflow API Directly:

```bash
curl -X POST http://localhost:7860/api/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "message": "How do I add a new user?",
    "session_id": "test_session_123",
    "inputs": {
      "user_role": "admin",
      "university_name": "African Leadership University",
      "university_subdomain": "alu"
    }
  }'
```

### Test Your Next.js API Route:

```bash
curl -X POST http://localhost:3000/api/scholar-chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "How do I add a new user?"
      }
    ],
    "userRole": "admin",
    "universityName": "African Leadership University",
    "universitySubdomain": "alu"
  }'
```

---

## Step 4: Troubleshooting

### Common Issues and Solutions:

#### 1. **Connection Refused Error**
```
Error: Langflow API error: 500 Internal Server Error
```

**Solution:**
- Check if Langflow server is running
- Verify the API URL in `.env.local`
- Check Langflow logs for errors

#### 2. **Authentication Error**
```
Error: Langflow API error: 401 Unauthorized
```

**Solution:**
- Verify your API key is correct
- Check if API key has proper permissions
- Ensure key is properly formatted in `.env.local`

#### 3. **Invalid Request Format**
```
Error: Langflow error: Invalid request format
```

**Solution:**
- Check your Langflow flow input configuration
- Verify the request payload matches expected format
- Test with Langflow's built-in API tester

#### 4. **Response Format Error**
```
Error: Cannot read property 'message' of undefined
```

**Solution:**
- Check your Langflow flow output configuration
- Ensure response matches expected format
- Verify flow is returning proper JSON structure

---

## Step 5: Advanced Configuration

### Customizing User Context:

You can modify the user context passed to Langflow by editing `src/components/chat/ScholarChat.tsx`:

```typescript
body: {
  userRole: userRole || "guest",
  universityName: uniName?.universityName || "ALU",
  universitySubdomain: uniName?.subdomain || "alu",
  // Add more context as needed
  userPermissions: getUserPermissions(userRole),
  currentPage: getCurrentPage(),
  // etc.
}
```

### Adding Error Handling:

Enhance error handling in `src/app/api/scholar-chat/route.ts`:

```typescript
try {
  // ... existing code
} catch (error) {
  console.error("Chat API error:", error);
  
  // More specific error messages
  if (error.message.includes("ECONNREFUSED")) {
    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content: "I'm unable to connect to my knowledge base. Please check if the Langflow server is running.",
    });
  }
  
  if (error.message.includes("401")) {
    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content: "Authentication error with my knowledge base. Please contact support.",
    });
  }
  
  // Generic fallback
  return NextResponse.json({
    id: Date.now().toString(),
    role: "assistant",
    content: "I'm having trouble processing your request. Please try again in a moment.",
  });
}
```

---

## Step 6: Monitoring and Logs

### Enable Debug Logging:

Add to your `.env.local`:

```bash
DEBUG=langflow:*
```

### Check Logs:

```bash
# Langflow logs
tail -f ~/.langflow/logs/langflow.log

# Next.js logs
npm run dev
```

### Monitor API Calls:

Add logging to your API route:

```typescript
console.log("Langflow request:", langflowRequest);
console.log("Langflow response:", langflowResponse);
```

---

## Step 7: Production Deployment

### Environment Variables for Production:

```bash
# Production Langflow URL
LANGFLOW_API_URL=https://your-langflow-domain.com
LANGFLOW_API_KEY=your_production_api_key
```

### Security Considerations:

1. **API Key Security**: Never commit API keys to version control
2. **HTTPS**: Use HTTPS in production
3. **Rate Limiting**: Implement rate limiting if needed
4. **Error Handling**: Proper error handling for production

---

## Testing Checklist

- ✅ Langflow server is running
- ✅ API key is configured correctly
- ✅ Environment variables are set
- ✅ API route responds correctly
- ✅ Chat interface connects to Langflow
- ✅ User context is passed correctly
- ✅ Error handling works
- ✅ Fallback responses work

---

## Support

If you encounter issues:

1. **Check Langflow logs** for detailed error messages
2. **Test API directly** using curl or Postman
3. **Verify environment variables** are loaded correctly
4. **Check network connectivity** between your app and Langflow
5. **Contact support** with specific error messages

---

*This guide assumes you have Langflow set up with a chat flow that accepts the specified input format and returns the expected output format.* 