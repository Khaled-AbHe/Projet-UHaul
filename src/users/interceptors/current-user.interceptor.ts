import { CallHandler, ExecutionContext, NestInterceptor,Session } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { UsersService } from "../services/users.service";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

export class CurrentUserInterceptor implements NestInterceptor{

    constructor(private userServices: UsersService){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const userId = request.session.userId;

       
        if(!userId){
            //gestion d'erreur s'il n'y a pas de user connecté
            console.log('No user connected')
            throw ExceptionsHandler
        }
        const user = this.userServices.findOne(userId)
        //trouver l'utilisateur dans la base de donnée en utilisant le userId
        request.CurrentUser = user;

        return next.handle();
    }
}
