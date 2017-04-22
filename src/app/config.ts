import {CustomConfig} from 'ng2-ui-auth';

export const IS_DEV = ENV === 'development';
export const API_URL = IS_DEV ? 'http://localhost:4040' : 'https://eliftech-tripstory.herokuapp.com';
export const FACEBOOK_APP_ID = IS_DEV ? '418197618334612' : '1876751672543517';

export class MyAuthConfig extends CustomConfig {
  defaultHeaders = {'Content-Type': 'application/json'};
  providers = {facebook: {clientId: FACEBOOK_APP_ID, url: `${API_URL}/api/auth/facebook/callback`}};
}
