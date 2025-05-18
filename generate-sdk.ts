import { rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateApi } from 'swagger-typescript-api';

const OPENAPI_URL = 'http://localhost:8000/api/v2/docs/schema/?format=json';
const SWAGGER_FILE = resolve(process.cwd(), './swagger.json');

const openapiData = await fetch(OPENAPI_URL).then((res) => res.json());

writeFileSync(SWAGGER_FILE, JSON.stringify(openapiData, null, 2));

await generateApi({
  input: SWAGGER_FILE,
  output: resolve(process.cwd(), './src/api/'),
  httpClientType: 'axios',
  singleHttpClient: true,
  extractEnums: true,
  extractRequestParams: true,
  unwrapResponseData: true,
  fileName: 'generated-api',
});

rmSync(SWAGGER_FILE);
