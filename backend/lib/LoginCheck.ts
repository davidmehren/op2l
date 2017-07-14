import {UserType} from "../model/UserTypes";
import {isNullOrUndefined} from "util";

export function isAdmin(request: any) {
    if (isNullOrUndefined(request.session.isLoggedIn)) {
        return false;
    }
    if (isNullOrUndefined(request.session.userType)) {
        return false;
    }
    return (request.session.isLoggedIn && request.session.userType === UserType.Admin);
}
