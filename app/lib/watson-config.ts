import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';

if (!process.env.WATSON_API_KEY || !process.env.WATSON_URL || !process.env.WATSON_ASSISTANT_ID) {
  throw new Error('Missing Watson credentials in environment variables');
}

export const assistant = new AssistantV2({
  version: '2023-06-15',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_API_KEY,
  }),
  serviceUrl: process.env.WATSON_URL,
});

export const ASSISTANT_ID = process.env.WATSON_ASSISTANT_ID; 