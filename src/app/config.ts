import {CustomConfig} from 'ng2-ui-auth';

export const FACEBOOK_APP_ID = '418197618334612';

export class MyAuthConfig extends CustomConfig {
  defaultHeaders = {'Content-Type': 'application/json'};
  providers = {facebook: {clientId: FACEBOOK_APP_ID, url: 'http://localhost:4040/api/auth/facebook/callback'}};
}
