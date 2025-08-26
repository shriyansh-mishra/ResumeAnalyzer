// src/config/config.ts
import dotenv from 'dotenv';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

// Load .env file only if it exists (for local development)
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('Loaded local .env file');
  }
} else {
  console.log('No .env file found — using environment variables from Render');
}

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, 'Gemini API key is required'),

  PORT: z.string().transform(Number).default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Validate environment variables and create config
let config: {
  gemini: { apiKey: string };
  server: { port: number; nodeEnv: string };
};

try {
  const env = envSchema.parse(process.env);
  console.log('Environment variables loaded successfully');
  console.log('Server port:', env.PORT);
  console.log('Environment:', env.NODE_ENV);
  console.log('Gemini API key:', env.GEMINI_API_KEY ? 'Present' : 'Missing');

  config = {
    gemini: {
      apiKey: env.GEMINI_API_KEY,
    },
    server: {
      port: env.PORT,
      nodeEnv: env.NODE_ENV,
    },
  };
} catch (error) {
  console.error('Error validating environment variables:', error);
  throw new Error('Invalid environment variables');
}

export { config };
