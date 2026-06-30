import { fromZonedTime } from "date-fns-tz";


export function convertDateToUtc(date: string, timezone: string): Date{
    const dateTime = `${date}T00:00:00`;
    
    return fromZonedTime(dateTime, timezone);
}

export function isValidTimeZone(timeZone: string): boolean {
    try {
        Intl.DateTimeFormat(undefined, {timeZone});
        return true;
    } catch {
        return false;
    }
}