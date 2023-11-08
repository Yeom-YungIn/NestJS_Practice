import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import * as bycrpt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtSevice: JwtService,
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
        let {userName, password} = authCredentialDto;
        const salt = await bycrpt.genSalt();
        password = await bycrpt.hash(password, salt);

        const user = this.userRepository.create({
            userName,
            password
        })
        await this.userRepository.save(user);
        return user;
    }

    async singIn(authCredentialDto: AuthCredentialDto): Promise<Object> {
        const {userName, password} = authCredentialDto;
        const user = await this.userRepository.findOneBy({userName});
        const compare = await bycrpt.compare(password, user.password);
        if (user && compare) {
            const payload = { userName }
            const accessToken = this.jwtSevice.sign(payload);
            return {result: 'Login Success', accessToken};
        }else {
            throw new UnauthorizedException();
        }
    }
}
