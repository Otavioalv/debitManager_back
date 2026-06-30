import { NextFunction, Request, Response } from "express";
import { AppError } from "../http/AppError";
import { isValidTimeZone } from "../utils/date.utils";

export function timezoneMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const timezone = req.get("Time-Zone");

    if(!timezone) {
        throw new AppError(
            400,
            "BAD_REQUEST_TIME_ZONE",
            "Time-Zone header is required"
        );
    }

    if(!isValidTimeZone(timezone)) {
        throw new AppError(
            400,
            "BAD_REQUEST_TIME_ZONE",
            "Invalid Time-Zone header"
        );
    }

    res.locals.timezone = timezone;
    next();
}
