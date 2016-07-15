/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things

    var ngVer = '@2.0.0-rc.4'; // lock in the angular package version; do not let it float to current!
    var routerVer = '@3.0.0-beta.1'; // lock router version
    var formsVer = '@0.2.0'; // lock forms version
    var routerDeprecatedVer = '@2.0.0-rc.2'; // temporarily until we update all the guides



    var map = {
        'app':                        'app', // 'dist',


       /* '@angular':                   'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs':                       'node_modules/rxjs',
*/

        '@angular':                   'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
        '@angular/router':            'https://npmcdn.com/@angular/router' + routerVer,
        '@angular/forms':             'https://npmcdn.com/@angular/forms' + formsVer,
        '@angular/router-deprecated': 'https://npmcdn.com/@angular/router-deprecated' + routerDeprecatedVer,
        'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api', // get latest
        'rxjs':                       'https://npmcdn.com/rxjs@5.0.0-beta.6',


        '@angular2-material':         'node_modules/@angular2-material',
        'ng2-material':         'node_modules/ng2-material',
       // 'dragula': 'node_modules/dragula/dist/dragula.js',
       // 'ng2-dragula': 'node_modules/ng2-dragula',
        'ng2-uploader':'node_modules/ng2-uploader'

    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'ng2-material':         { main: 'index.js', defaultExtension: 'js' },
        //'ng2-dragula':{ main: 'ng2-dragula.js', defaultExtension: 'js' },
        'ng2-uploader':{ main: 'ng2-uploader.js', defaultExtension: 'js' }
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'upgrade',
    ];

    var materialPkgs = [
        'core',
        'checkbox',
        'input',
        'list'
    ];


    var materialPackages = [
        'core', 'toolbar', 'button', 'card', 'checkbox', 'icon', 'input', 'list', 'progress-bar',
        'progress-circle', 'radio', 'sidenav', 'grid-list', 'tabs', 'slide-toggle'
    ];
    materialPackages.forEach(function(item) {
        packages['@angular2-material/' + item] = { main: item };
    });

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);