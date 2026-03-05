import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Session } from "@nestjs/common";
import { find, map, Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private userService : UsersService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        
        const userId = request.session.userId;
        
        if (!userId) {
            console.log("il n'y a pas d'utilisateur connecté");
        } else {
            const user = this.userService.findOne(userId);
            
            request.currentUser = user;
        }

        return next.handle();
    }
}