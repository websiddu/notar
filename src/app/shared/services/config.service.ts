export class Config {

  clientId = '155734877039-ftadpu31p6i79iied572licad72ji4bt.apps.googleusercontent.com';
  scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.install',
    'https://www.googleapis.com/auth/drive.file'
  ];
  authProperties = {
    client_id: this.clientId,
    cookiepolicy: 'single_host_origin',
    immediate: true,
    scope: this.scopes.join(' ')
  };

  scriptId = '1585tQzTyZ0DXBT_X0K1mHgUFx0hG_EQNAyEvkLAR9jSXMAZrQ4tpyMQP';

  // API
  apiRootUrl = 'https://www.googleapis.com/drive/v3';

  apiFilesUrl = `${this.apiRootUrl}/files`;
  apiCreateUrl = `/files`;

  constructor() {

  }
}
