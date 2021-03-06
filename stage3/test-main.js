var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});
console.log('load', allTestFiles);

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

    paths: {
        angular: 'bower_components/angular/angular',
        'angular-animate': 'bower_components/angular-animate/angular-animate',
        'angular-aria': 'bower_components/angular-aria/angular-aria',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
        'angular-material': 'bower_components/angular-material/angular-material',
        'ol': 'ol',
        'openlayers-directive': 'bower_components/angular-openlayers-directive/dist/angular-openlayers-directive'
    },
    shim: {
        angular: {
            exports: 'angular' // pick up the global
        },
        'angular-animate': ['angular'],
        'angular-aria': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-material': ['angular', 'angular-animate', 'angular-aria'],
        'ol': {
            exports: 'ol'
        },
        'openlayers-directive': ['angular', 'ol', 'angular-sanitize']
    },


  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
