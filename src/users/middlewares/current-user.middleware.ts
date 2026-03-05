import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userServices: UsersService) {}

    async use(req: any, res: any, next: () => void) {
        const { userId } = req.session;
        if(userId) {
            const user = await this.userServices.findOne(userId);
            req.session.CurrentUser = user;
        }
        next();
    }
}