import Redis from 'ioredis';
import { configDotenv } from 'dotenv';
configDotenv()

const redis = new Redis(process.env.REDIS_URI);

// Optional: Handle connection events
redis.on('connect', () => {
    console.log('Connected to Redis Cloud');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});



// Add or Update Participant in Leaderboard
export const addToLeaderboard = async (quizId, username, score, time) => {
  const compositeTime = (999999 - time).toString().padEnd(6, '0'); // Ensure six digits with trailing zeros
  const compositeScore = `${score}.${compositeTime}`; 
  await redis.zadd(`quiz:${quizId}:leaderboard`, compositeScore, username);
};

// Get Sorted Leaderboard from Redis
export const getLeaderboard = async (quizId) => {
  const leaderboardData = await redis.zrevrange(`quiz:${quizId}:leaderboard`, 0, -1, 'WITHSCORES');
  const leaderboard = [];

  for (let i = 0; i < leaderboardData.length; i += 2) {
    const username = leaderboardData[i];
    const score = leaderboardData[i + 1].split('.')[0]; // Extract the score from compositeScore
    const timeComponent = leaderboardData[i + 1].split('.')[1].padEnd(6, '0'); // Ensure six digits with trailing zeros
    const time = 999999 - parseInt(timeComponent); // Retrieve original time
    leaderboard.push({ username, score: parseInt(score), time });
  }
  
  return leaderboard;
};

