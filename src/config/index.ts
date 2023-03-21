export const config = {
  port: process.env.PORT || 3000,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
  awsRegion: process.env.AWS_REGION || 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  consumerQueueName: process.env.CONSUMER_NAME, // platform listener queue for platform crons
  consumerQueueUrl: process.env.CONSUMER_URL,
  producerQueueName: process.env.PRODUCER_NAME, // any event to be sent out by service
  producerQueueUrl: process.env.PRODUCER_URL,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
};

export default () => config;
