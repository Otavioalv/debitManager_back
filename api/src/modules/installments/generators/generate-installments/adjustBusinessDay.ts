import { addDays } from "date-fns";

export interface AdjustBusinessDayParams {
    date: Date;
    skipSaturday: boolean;
    skipSunday: boolean;
}

export function adjustBusinessDay({ 
    date, 
    skipSaturday, 
    skipSunday 
}: AdjustBusinessDayParams): Date {
    let adjustedDate = date;
    
    while(true){
        const day = adjustedDate.getUTCDay();
        
        const isSaturday = day === 6;
        const isSunday = day === 0;
        
        const shouldSkip = (isSaturday && skipSaturday) || (isSunday && skipSunday);
        
        if(!shouldSkip) {
            return adjustedDate;
        }

        adjustedDate = addDays(adjustedDate, 1);
    }
}
