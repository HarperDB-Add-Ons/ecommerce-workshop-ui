import { execSync } from 'node:child_process';


execSync(`cd ${import.meta.dirname} && npm i -save && npm run build`);
console.log({ success: 'built ui' });
