import fs from 'fs';
import ibm from 'ibm-cos-sdk';
import path from 'path';

export default function deletePhoto(key: string) {
  if (process.env.STORAGE_TYPE === 'cos') {
    const cos = new ibm.S3({
      endpoint: process.env.IBM_ENDPOINT,
      apiKeyId: process.env.IBM_API_KEY_ID,
      ibmAuthEndpoint: process.env.IBM_AUTH_ENDPOINT,
      serviceInstanceId: process.env.IBM_SERVICE_INSTANCE_ID,
    });

    return cos
      .deleteObject({
        Bucket: process.env.IBM_BUCKET!,
        Key: key,
      })
      .promise();
  }

  return fs.promises.unlink(path.resolve(__dirname, '..', '..', 'tmp', key));
}
