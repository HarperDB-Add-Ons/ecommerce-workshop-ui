import { execSync } from 'node:child_process';

export class Build extends Resource {
	async get() {
		execSync(`cd ${import.meta.dirname} && npm i -save && npm run build`);
		return { success: 'built ui' };
	}
}
