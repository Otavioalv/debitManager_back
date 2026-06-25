import { fromZonedTime } from "date-fns-tz";


export function convertDateToUtc(date: string, timezone: string): Date{
    const dateTime = `${date}T00:00:00`;
    
    return fromZonedTime(dateTime, timezone);
}
