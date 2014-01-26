module.exports = function(config){
    config.set({


    basePath : '../',

    files : [
  		'app/scripts/*.js',
  		'app/scripts/**/*.js',
        'test/e2e/*.js',
    ],

    autoWatch : true,

    // browsers : ['Chrome'],

    frameworks: ['ng-scenario'],

    singleRun : false,

    proxies : {
      '/': 'http://localhost:9000/'
  	},
    
	// urlRoot : '/test/e2e/',

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-scenario',
            'karma-phantomjs-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    }

})}