import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from 'src/config/google-oauth.config';
import { AuthService } from 'src/services/auth.service';

interface IProfile {
  emails: { value: string }[];
  name: { givenName: string; familyName: string };
  displayName: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID!,
      clientSecret: googleConfiguration.clientSecret!,
      callbackURL: googleConfiguration.callbackURL!,
      scope: ['email', 'profile'],
    });
  }

  getDefaultPassword(name: string): string {
    return `#${name[0].toLocaleUpperCase()}${name.slice(0)}.7098`;
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: IProfile,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      password: this.getDefaultPassword(profile.name.givenName),
      telefone: '',
      username: profile.displayName,
      isActive: true,
      isOAuthUser: true,
    });

    done(null, user);
  }
}
