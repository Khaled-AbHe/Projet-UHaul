import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signin() {
        return 'this action will sign in a user';
    }

    signup() {
        return 'this action will sign up a user';
    }
}