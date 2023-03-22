export const config = {
  port: process.env.PORT || 3000,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
  awsRegion: process.env.REGION_AWS || 'us-west-1',
  accessKeyId: process.env.ACCESS_KEY_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
  consumerQueueName: process.env.CONSUMER_NAME, // platform listener queue for platform crons
  consumerQueueUrl: process.env.CONSUMER_URL,
  producerQueueName: process.env.PRODUCER_NAME, // any event to be sent out by service
  producerQueueUrl: process.env.PRODUCER_URL,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  newrelicApp: process.env.NEWRELIC_APP,
  newrelicLicense: process.env.NEWRELIC_LICENSE_KEY,
};

export default () => config;
