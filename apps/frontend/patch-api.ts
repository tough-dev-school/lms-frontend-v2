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
  fileContent = fileContent.replace(/(slug|id|uuid)\?:/g, '$1:'); // primary key can't be undefined
  fileContent = fileContent.replace(/(name)\?:/g, '$1:'); // name can't be undefined
  fileContent = fileContent.replace(
    /(\w+)\?: string \| null;/g,
    '$1: string | null;',
  ); // nullable fields can't be undefined

  fileContent = fileContent.replace(/(\w+)\?: (\w+)\[];/g, '$1: $2[];'); // array can't be undefined, they can be empty

  fs.writeFileSync(filePath, fileContent);
});
