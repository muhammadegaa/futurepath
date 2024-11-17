import { NextResponse } from 'next/server';
import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';
import { RuntimeResponseGeneric } from 'ibm-watson/assistant/v2';

// Ensure the Assistant ID exists and assert it as string
const ASSISTANT_ID = process.env.WATSON_ASSISTANT_ID as string;
if (!process.env.WATSON_API_KEY || !process.env.WATSON_URL || !ASSISTANT_ID) {
  throw new Error('Missing Watson credentials in environment variables');
}

const assistant = new AssistantV2({
  version: '2023-06-15',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_API_KEY,
  }),
  serviceUrl: process.env.WATSON_URL,
});

export async function POST(request: Request) {
  try {
    const { goal, progress } = await request.json();
    
    // Create a session
    const session = await assistant.createSession({
      assistantId: ASSISTANT_ID,
    });

    // Send the message
    const response = await assistant.message({
      assistantId: ASSISTANT_ID,
      sessionId: session.result.session_id,
      input: {
        text: `Generate a motivational message for someone who has achieved ${progress}% of their goal: ${goal}`
      }
    });

    // Clean up by deleting the session
    await assistant.deleteSession({
      assistantId: ASSISTANT_ID,
      sessionId: session.result.session_id,
    });

    // Extract the response text with proper type checking
    const genericResponses = response.result.output.generic || [];
    const textResponse = genericResponses.find(
      (response): response is RuntimeResponseGeneric & { text: string } => 
        'text' in response && typeof response.text === 'string'
    );

    const message = textResponse?.text || "Keep pushing forward! You're making great progress!";

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Watson Assistant Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate motivation message' },
      { status: 500 }
    );
  }
} 