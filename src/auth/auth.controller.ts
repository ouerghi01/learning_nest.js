import { Body, Controller, Get, Request,HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard.';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async sign_in(@Body() body: { email: string; password: string }) {
        return this.authService.sign_in(body.email, body.password);
    }
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
