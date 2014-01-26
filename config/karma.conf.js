module.exports = function(config){
    config.set({
    	
    basePath : '../',

    files : [
      'app/components/angular/angular.js',
	  'app/components/angular/angular-*.js',
	  'app/components/angular-mocks/angular-mocks.js',
	  'app/scripts/*.js',
	  'app/scripts/**/*.js',
	  'test/spec/**/*.js',
    ],

    exclude : [
     
    ],

    autoWatch : true,
    
    singleRun : false,

    frameworks: ['jasmine'],

    // browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}