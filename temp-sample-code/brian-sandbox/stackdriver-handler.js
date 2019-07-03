// Imports the Google Cloud client library
const monitoring = require('@google-cloud/monitoring');

// Creates a client
const client = new monitoring.MetricServiceClient();

/**
 * TODO(developer): Uncomment and edit the following lines of code.
 */
// const projectId = 'YOUR_PROJECT_ID';

const request = {
  name: client.projectPath(projectId),
  metricDescriptor: {
    description: 'Daily sales records from all branch stores.',
    displayName: 'Daily Sales',
    type: 'custom.googleapis.com/stores/daily_sales',
    metricKind: 'GAUGE',
    valueType: 'DOUBLE',
    unit: '{USD}',
    labels: [
      {
        key: 'store_id',
        valueType: 'STRING',
        description: 'The ID of the store.',
      },
    ],
  },
};

// Creates a custom metric descriptor
const [descriptor] = await client.createMetricDescriptor(request);
console.log('Created custom Metric:\n');
console.log(`Name: ${descriptor.displayName}`);
console.log(`Description: ${descriptor.description}`);
console.log(`Type: ${descriptor.type}`);
console.log(`Kind: ${descriptor.metricKind}`);
console.log(`Value Type: ${descriptor.valueType}`);
console.log(`Unit: ${descriptor.unit}`);
console.log('Labels:');
descriptor.labels.forEach(label => {
  console.log(`  ${label.key} (${label.valueType}) - ${label.description}`);
});