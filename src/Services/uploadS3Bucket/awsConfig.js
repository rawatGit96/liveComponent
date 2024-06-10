import AWS from "aws-sdk";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
const REGION = process.env.REACT_APP_S3_REGION;
const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

export { s3, S3_BUCKET };
