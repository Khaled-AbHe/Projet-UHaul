import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
// import { UserDto } from "../dtos/user.dto";
import { plainToClass } from "class-transformer";

interface ClassConstrcutor {
    new (...args : any[]) : {}
}

export function Serialize(dto: ClassConstrcutor) { // This stops us from writing the whole signature
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto : any) {} // Allows any DTOs instead of just one

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // before the request is handled


        return next.handle().pipe(
            map((data : any) => {
                // before the response if sent out

                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                }) 
            })
        )
    }
    
}