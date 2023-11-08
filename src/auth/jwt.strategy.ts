import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>
    ) {
        super({
            secretOrKey: 'nestJS_practice_123',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload) {
        const {userName} = payload
        const user: User = await this.userRepository.findOneBy({userName})
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}