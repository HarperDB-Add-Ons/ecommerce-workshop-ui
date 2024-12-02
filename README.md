# HarperDB Application Template

This is a simple UI for a product catalog. By default, it loads product  from a legacy Java-powered API server located at https://ecommerce.edgecloud9.com

The purpose of the workshop is to:

1. swap out the inventory and price API calls with calls to HarperDB endpoints
2. add WS subscriptions to the application to deliver real-time updates to the UI


### Installation

For Cloud-Native Developers, you'll want to import this repository into your HarperDB instance using the UI in the Applicaitons tab of HarperDB Studio.

For developers working locally, you can simply clone this repository into your compoenents directory (normally ~/hdb/components).

### Configuring Tables

The [schema.graphql](./schema.graphql) is the schema definition. This is the main starting point for defining your database schema, specifying which tables you want and what attributes/fields they should have.

The [resources.js](./resources.js) provides a template for defining JavaScript resource classes, for customized application logic in your endpoints.

### Deploying Static Site

By default, this static react app requires that the application is "built" and served as static HTML. To enable the build process and ensure cloud-native dev elopers can change the application code in the Studio and see their changes, this repo adds a single endpoint: `https://my-instance-url:9926/Build/` in `resources.js`. This will install all the npm dependencies and execute `npm run build`, placing the static output of that process into a `/build` folder, which is specified as the source of static files in `config.yaml`.

Each time the user updates the UI, they will need to hit `https://my-instance-url:9926/Build/` to ensure their changes show up when they refresh the page.

### Example Data

This Repository also contains two example `.csv` docs filled with price and inventory data for each of the items in the legacy product database. Once the application starts up, they should insert this data via the Studio's browse tab.
