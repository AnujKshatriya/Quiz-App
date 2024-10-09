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
export const addToLeaderboard = async (quizId, userId, score, time) => {
  const compositeScore = `${score}.${999999 - time}`; // Ensures lower time ranks higher for equal scores
  await redis.zadd(`quiz:${quizId}:leaderboard`, compositeScore, userId);
};

// Get Sorted Leaderboard from Redis
export const getLeaderboard = async (quizId) => {
  const leaderboardData = await redis.zrevrange(`quiz:${quizId}:leaderboard`, 0, -1, 'WITHSCORES');
  const leaderboard = [];

  for (let i = 0; i < leaderboardData.length; i += 2) {
    const userId = leaderboardData[i];
    const score = leaderboardData[i + 1].split('.')[0]; // Extract the score from compositeScore
    const time = 999999 - parseInt(leaderboardData[i + 1].split('.')[1]); // Retrieve original time

    leaderboard.push({ userId, score: parseInt(score), time });
  }
  
  return leaderboard;
};
