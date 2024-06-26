import { message } from "antd";
import { s3, S3_BUCKET } from "./awsConfig";
import { constant, folderName } from "../../Utils/constants";
const CDN_URL = process.env.REACT_APP_CDN_URL;

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk

const uploadFileToS3 = async (
  file,
  setUploadProgress = () => {},
  upload_type
) => {
  try {
    const folder = folderName[upload_type] ?? constant.PROFILE_FOLDER;
    const fileName = file.name.split(".");

    //key name only used to create the file upload path in AWS
    const key_name = `${folder}/${fileName[0]}-${Date.now()}.${fileName[1]}`;
    const url = `${CDN_URL}${key_name}`;

    // Start multipart upload and get upload ID
    const createMultipartUploadParams = {
      Bucket: S3_BUCKET,
      Key: key_name,
      ContentType: file.type,
    };

    const { UploadId } = await s3
      .createMultipartUpload(createMultipartUploadParams)
      .promise();

    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    const parts = [];

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const partParams = {
        Body: file.slice(start, end),
        Bucket: S3_BUCKET,
        Key: key_name,
        PartNumber: partNumber,
        UploadId,
      };
      const { ETag } = await s3.uploadPart(partParams).promise();
      parts.push({ PartNumber: partNumber, ETag });
      const percentCount = Math.round((partNumber / totalParts) * 100);
      setUploadProgress(percentCount); // used to show the percentage count of upload content
    }

    const completeMultipartUploadParams = {
      Bucket: S3_BUCKET,
      Key: key_name,
      UploadId,
      MultipartUpload: { Parts: parts },
    };

    const result = await s3
      .completeMultipartUpload(completeMultipartUploadParams)
      .promise();

    if (result.$response?.httpResponse?.statusCode === 200)
      return { status: 200, data: { url, key_name } };
    else message.error("Error in uploading content");
  } catch (error) {
    console.error("AWS S3 Multipart Upload Error:", error);
    return { status: 500, error };
  }
};

export default uploadFileToS3;

// import AWS from 'aws-sdk';
// import { toast } from 'react-toastify';

// const S3_BUCKET = process.env.REACT_APP_S3_BUCKET_NAME;
// const REGION = process.env.REACT_APP_S3_REGION;
// const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
// const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

// const uploadFileToS3 = (file, bucketPath, handleUpload = () => {}) => {
//   AWS.config.update({
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY
//   });
//   const s3 = new AWS.S3({
//     params: { Bucket: S3_BUCKET },
//     region: REGION
//   });

//   const params = {
//     Bucket: S3_BUCKET,
//     Key: bucketPath, // file.name,
//     Body: file
//   };
//   var upload = s3
//     .putObject(params)
//     .on('httpUploadProgress', () => {
//       // console.log('Uploading ' + parseInt((evt.loaded * 100) / evt.total) + '%');
//     })
//     .promise();

//   upload.then(() => {
//     // console.log('+++S3 errror', err, data);
//     // return { err, data };
//     handleUpload();
//   });
// };

// export const deleteS3Object = async (bucketPath, handleDelete = () => {}) => {
//   // return new Promise((resolve, reject) => {
//   try {
//     let s3bucket = new AWS.S3({
//       accessKeyId: ACCESS_KEY,
//       secretAccessKey: SECRET_ACCESS_KEY,
//       Bucket: S3_BUCKET
//     });
//     var params = { Bucket: S3_BUCKET, Key: bucketPath };
//     // console.log('params delete', params);
//     s3bucket.deleteObject(params, function (err) {
//       // console.log('++delete response', data, err);
//       // an error occurred
//       if (err) console.log('image delete failed');
//       else handleDelete();
//       //resolve(data); // successful response
//       // console.log(typeof handleDelete, 'type');
//     });
//   } catch (e) {
//     toast.error('Something went wrong-----');
//   }
//   // });
// };

// export default uploadFileToS3;
