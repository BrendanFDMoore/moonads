require('ts-node/register');
const Jasmine = require('jasmine');

const runner = new Jasmine();

global.jasmine = runner.jasmine;

runner.loadConfig({
  spec_dir: 'src',
  spec_files: [ '**/*.spec.ts' ]
});

runner.execute();