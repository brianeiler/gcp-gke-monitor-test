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
    description: 'Number of active users.',
    displayName: 'Active Users',
    type: 'custom.googleapis.com/webapp/active_users',
    metricKind: 'GAUGE',
    valueType: 'DOUBLE',
    unit: '{users}',
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



// Imports the Google Cloud client library
const monitoring = require('@google-cloud/monitoring');

// Creates a client
const client = new monitoring.MetricServiceClient();

/**
 * TODO(developer): Uncomment and edit the following lines of code.
 */
// const projectId = 'YOUR_PROJECT_ID';

const dataPoint = {
  interval: {
    endTime: {
      seconds: Date.now() / 1000,
    },
  },
  value: {
    doubleValue: 123.45,
  },
};

const timeSeriesData = {
  metric: {
    type: 'custom.googleapis.com/stores/daily_sales',
    labels: {
      store_id: 'Pittsburgh',
    },
  },
  resource: {
    type: 'global',
    labels: {
      project_id: projectId,
    },
  },
  points: [dataPoint],
};

const request = {
  name: client.projectPath(projectId),
  timeSeries: [timeSeriesData],
};

// Writes time series data
const result = await client.createTimeSeries(request);
console.log(`Done writing time series data.`, result);
