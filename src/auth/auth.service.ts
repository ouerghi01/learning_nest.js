import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UserService
        ,
        private jwtService: JwtService
    ) {}
    async sign_in(email: string, password: string) : Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        if (user?.password !== password) {
            throw new UnauthorizedException();
          }
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
