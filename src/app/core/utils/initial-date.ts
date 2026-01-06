import { DatesFormat } from "../../shared/models/dates/dates-model";

export function weeklyDates(): DatesFormat {
    const todayDate = new Date()

    const nextDay = new Date(todayDate);
    nextDay.setDate(nextDay.getDate() + 1)

    const endDate = nextDay.toISOString().split('T')[0];

    const lastWeek = new Date(todayDate);
    lastWeek.setDate(lastWeek.getDate() - 7)

    const startDate = lastWeek.toISOString().split('T')[0];
    
    return {startDate,endDate};
}

export function monthlyDates(): DatesFormat {
    const todayDate = new Date()

    const nextDay = new Date(todayDate);
    nextDay.setDate(nextDay.getDate() + 1)

    const endDate = nextDay.toISOString().split('T')[0];

    const lastWeek = new Date(todayDate);
    lastWeek.setDate(lastWeek.getDate() - 28)

    const startDate = lastWeek.toISOString().split('T')[0];
    
    return {startDate,endDate};
}