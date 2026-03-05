import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const isHandlerSignIn = context.getHandler().name == "signIn" // This allows all requests coming from the Sign In route
        const isUserSignedIn = req.session.userId // This allows users that are signed in
        return isHandlerSignIn || isUserSignedIn
    }
}