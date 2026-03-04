import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private usersService: UsersService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Find the user id
        const req = context.switchToHttp().getRequest()
        const id = req.session.userId

        /** 
         * Create a new property within the request
         *  - This is how the CurrentUser decorator will get it
         *  - You do this so that the CurrentUser decorator gets access to it  
        */ 
        if (!id) throw new NotFoundException("No user is connected")
        req.currUser = this.usersService.findUserById(id)
        
        return next.handle()
    }
    
}