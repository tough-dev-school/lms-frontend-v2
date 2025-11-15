import fs from 'node:fs';
import path from 'node:path';

const typesDirectory = 'src/api/generated/types';
const files = fs.readdirSync(typesDirectory);

files.forEach((file) => {
  const filePath = path.join(typesDirectory, file);
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Kubb issues:
  fileContent = fileContent.replace(/readonly /g, '');

  // Backend side issues:
  fileContent = fileContent.replace(/(slug|id|uuid)\?:/g, '$1:');
  fileContent = fileContent.replace(/(name)\?:/g, '$1:');
  fileContent = fileContent.replace(
    /(\w+)\?: string \| null;/g,
    '$1: string | null;',
  );

  fs.writeFileSync(filePath, fileContent);
});
