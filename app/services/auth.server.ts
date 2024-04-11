import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from './session.server'

export type AuthUserType = {
  id: string,
  name: string,
  email: string,
  image: string
}

const authenticator = new Authenticator<AuthUserType>(sessionStorage)

if (
  !(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.CLIENT_URL
  )
) {
  throw new Error(
    'GOOGLE_CLIENT_ID、GOOGLE_CLIENT_SECRET、CLIENT_URLが設定されていません。',
  )
}

const googleStrategy = new GoogleStrategy<AuthUserType>(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
  },
  async ({ profile }) => {
    return {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails.length > 0 ? profile.emails[0].value : '',
      image: profile.photos.length > 0 ? profile.photos[0].value : '',
    }
  }
);
authenticator.use(googleStrategy);

export { authenticator } 