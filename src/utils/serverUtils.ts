import fs from 'fs';
import path from 'path';

export const getFileFromDisk = (filePath: string, fileName: string) => {
  try {
    const buffer = fs.readFileSync(path.resolve(filePath, fileName));
    // Convert the buffer to a Base64 string
    const content = buffer.toString('base64');
    // Return the Base64 string and filename
    return { content, fileName };
  } catch {
    console.log(`***** File not found in Path: ${filePath}, ${fileName}`);
    return { content: 'File not found', fileName: fileName };
  }
};
