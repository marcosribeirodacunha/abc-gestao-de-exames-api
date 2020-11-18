import fs from 'fs';
import path from 'path';

export default function deletePhoto(key: string) {
  return fs.promises.unlink(path.resolve(__dirname, '..', '..', 'tmp', key));
}
