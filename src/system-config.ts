/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'firebase': 'vendor/firebase/firebase.js',
  'angularfire2': 'vendor/angularfire2',
  // 'ckeditor': 'vendor/ckeditor/ckeditor.js'
  'ng2-ckeditor': 'vendor/ng2-ckeditor/lib/CKEditor.js',
};

/** User packages configuration. */
const packages: any = {
  'angularfire2': {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  },
  'ng2-ckeditor': {
    format: 'cjs'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/forms',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/+docs',
  'app/+docs/doc',
  'app/+docs/shared/profile-bar',
  'app/+docs/side-bar',
  'app/+docs/tags-bar',
  'app/+login',
  'app/shared/doc/card',
  'app/shared/doc/doc-list',
  'app/shared/common/spinner',
  'app/+docs/shared/onboarding',
  'app/shared/common/modal',
  'app/shared/common/modal/overlay',
  'app/shared/common/carousel',
  'app/shared/common/carousel/slide',
  'app/shared/common/editor',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
