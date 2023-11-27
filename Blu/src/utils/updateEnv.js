require('dotenv').config(); // Load environment variables from .env file

if (process.argv.length < 4) {
  console.error('Usage: node updateEnv.js VARIABLE_NAME NEW_VALUE');
  process.exit(1);
}

const variableName = process.argv[2];
const newValue = process.argv[3];

// Update the environment variable
process.env[variableName] = newValue;