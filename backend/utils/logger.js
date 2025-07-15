// utils/logger.js
const axios = require('axios');

const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYXlhbmtqb3NoaS4yMjAxMTIwNjNAZ2VodS5hYy5pbiIsImV4cCI6MTc1MjU1NjczOCwiaWF0IjoxNzUyNTU1ODM4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmFlYjZkMjgtZDgxZi00Y2M5LTk0ZTMtYWZiZjMwMDZkOTRiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWF5YW5rIGpvc2hpIiwic3ViIjoiZjQwNzdkZTItYjQ2Zi00NWZhLWIxYjYtNDE1YjA3OTJlOWNhIn0sImVtYWlsIjoibWF5YW5ram9zaGkuMjIwMTEyMDYzQGdlaHUuYWMuaW4iLCJuYW1lIjoibWF5YW5rIGpvc2hpIiwicm9sbE5vIjoiMjI5NDA0MyIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6ImY0MDc3ZGUyLWI0NmYtNDVmYS1iMWI2LTQxNWIwNzkyZTljYSIsImNsaWVudFNlY3JldCI6ImdHUVJBZ0N4UXpScFhhY0MifQ.Qq01jWYTinfQjkuFcII8vwBizIlSXEw1kBNG-Y0trTc'; 

async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      LOG_ENDPOINT,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (err) {
    console.error('Log Error:', err.message);
  }
}

module.exports = Log;
