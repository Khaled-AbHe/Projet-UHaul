import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CurrentUser } from "src/users/decorators/current-user.decorators";

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.session.CurrentUser || {};
        console.log(CurrentUser);
        return user.admin;
    }
}