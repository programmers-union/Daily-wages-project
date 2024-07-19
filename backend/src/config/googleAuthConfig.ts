import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import Client from "../models/Client";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:5000/api/auth/google/callback', // Ensure this matches
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
      try {
        let client = await Client.findOne({ email: profile.emails?.[0].value });
        if (!client) {
          client = new Client({
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            email: profile.emails?.[0].value,
            password: '',
            phoneNumber: '',
            isVerified: true,
          });
          await client.save();
        }
        done(null, client);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((client, done) => {
  done(null, (client as any).id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const client = await Client.findById(id);
    done(null, client);
  } catch (error) {
    done(error, null);
  }
});
