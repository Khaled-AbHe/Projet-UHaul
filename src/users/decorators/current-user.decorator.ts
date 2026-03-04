// retourne quel utilisateur est connecté
// retourne juste un string pour tester que tout fonctionne

import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CurrentUser = createParamDecorator(
    (data : never, context : ExecutionContext) =>{
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
)
    

