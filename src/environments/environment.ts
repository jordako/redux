// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultLanguage: 'es-ES',
  supportedLanguages: ['es-ES', 'en-GB'],
  serverUrl: '',
  firebase: {
    apiKey: 'AIzaSyC-FGVsEBRgKINmTWwega6nGg-Q43O-GA4',
    authDomain: 'redux-app-ac443.firebaseapp.com',
    databaseURL: 'https://redux-app-ac443.firebaseio.com',
    projectId: 'redux-app-ac443',
    storageBucket: 'redux-app-ac443.appspot.com',
    messagingSenderId: '531523400456',
    appId: '1:531523400456:web:b8ac4a674a7b547baab2bd',
    measurementId: 'G-4FDKWVKDLR',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
