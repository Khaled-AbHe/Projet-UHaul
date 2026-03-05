import { Injectable,NestMiddleware } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{

    constructor(private userServices: UsersService){}
       
    async use(req: any, res:any,next: () => void){
        const { userId } = req.session;

        if(!userId){
            //gestion d'erreur s'il n'y a pas de user connecté
            console.log('No user connected')
        }else{
            const user = await this.userServices.findOne(userId)
            //trouver l'utilisateur dans la base de donnée en utilisant le userId
            req.CurrentUser = user;
        }
        next();
    }     
}
