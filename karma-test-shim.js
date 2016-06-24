// reference: https://github.com/ocombe/ng2-translate/blob/master/karma-test-shim.js

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma"s synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };

System.config({
	baseURL: "/base/",
	defaultJSExtensions: true,
	map: {
		"@angular": "node_modules/@angular",
		"@obg": "node_modules/@obg",
		"@ngrx": "node_modules/@ngrx",
		"cachefactory": "node_modules/cachefactory/dist",
		"rxjs": "node_modules/rxjs",
		"lodash": "node_modules/lodash",
		"ng2-translate": "node_modules/ng2-translate"
	},
	packages: {
		"@angular/common": { main: "index.js", defaultExtension: "js" },
		"@angular/compiler": { main: "index.js", defaultExtension: "js" },
		"@angular/core": { main: "index.js", defaultExtension: "js" },
		"@angular/http": { main: "index.js", defaultExtension: "js" },
		"@angular/platform-browser": { main: "index.js", defaultExtension: "js" },
		"cachefactory": { main: "cachefactory.js", defaultExtension: "js" },
		"lodash": { main: "index.js", defaultExtension: "js" },
		"@ngrx/core": { main: "index.js", defaultExtension: "js" },
		"@ngrx/store": { main: "index.js", defaultExtension: "js" },
		"@ngrx/effects": { main: "index.js", defaultExtension: "js" },
		"ng2-translate": { main: "ng2-translate.js", defaultExtension: "js" },
		"@obg/ng2.global": { main: "dist/amd/index.js", defaultExtension: "js" },
		"@obg/ng2.common": { main: "dist/amd/index.js", defaultExtension: "js" },
	}
});

System.import("@angular/platform-browser/src/browser/browser_adapter").then(function (browser_adapter) {
	browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function () {
	return Promise.all(
		Object.keys(window.__karma__.files) // All files served by Karma.
			.filter(onlySpecFiles)
			.map(file2moduleName)
			.map(function (path) {
				return System.import(path);
			}));
})
	.then(function () {
		__karma__.start();
	}, function (error) {
		console.error(error.stack || error);
		__karma__.start();
	});


function onlySpecFiles(path) {
	return /[\.|_]spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
	return filePath.replace(/\\/g, "/")
		.replace(/^\/base\//, "")
		.replace(/\.js/, "");
}