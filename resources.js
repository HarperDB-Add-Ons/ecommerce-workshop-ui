import { execSync } from 'node:child_process';

class originAPI extends Resource {
	async get() {
		return (await fetch(`https://ecommerce.edgecloud9.com/api/products/${this.getId()}`)).json();
	}
}

const { api } = tables;
api.sourcedFrom(originAPI);

export class build extends Resource {
	async get() {
		execSync(`cd ${import.meta.dirname} && npm i -save && npm run build`);
		console.log('built ui on start');
	}
}
