import { CustomConfig } from 'ng2-ui-auth';

export const IS_DEV = ENV === 'development';

export const API_URL = IS_DEV ? 'http://localhost:4040' : 'https://eliftech-tripstory.herokuapp.com';

export const FACEBOOK_APP_ID = IS_DEV ? '418197618334612' : '1876751672543517';

export const GOOGLE_CLIENT_ID = '616075536950-pauau0e7u0c980llqh99ftvg3sd32c61.apps.googleusercontent.com';

export class MyAuthConfig extends CustomConfig {
  public defaultHeaders = {'Content-Type': 'application/json'};
  public providers = {
    facebook: {clientId: FACEBOOK_APP_ID, url: `${API_URL}/api/auth/facebook/callback`},
    google: {clientId: GOOGLE_CLIENT_ID, url: `${API_URL}/api/auth/google/callback`}
  };
}
