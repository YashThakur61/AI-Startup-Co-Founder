const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

async function main() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  
  console.log(`MongoDB Memory Server started at: ${uri}`);
  
  const envPath = path.join(__dirname, '.env.local');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Replace or add MONGODB_URI
  if (envContent.includes('MONGODB_URI=')) {
    envContent = envContent.replace(/MONGODB_URI=.*/g, `MONGODB_URI=${uri}`);
  } else {
    envContent += `\nMONGODB_URI=${uri}\n`;
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('Updated .env.local with new MONGODB_URI');
  
  // Keep the process alive
  process.stdin.resume();
  console.log('Press Ctrl+C to stop the database');
}

main().catch(console.error);
