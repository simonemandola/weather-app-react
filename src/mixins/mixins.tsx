export default function scrollToTheTop(): void {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}

export function getWeekdayNameLong(time: number): string {
    return new Date(time * 1000).toLocaleDateString('es', {weekday: 'long'})
}

/**
 *
 * @param time
 * @param offset
 */
export function formatTimeHour(time: number, offset: number): string | undefined {

    const offsetMilliseconds = offset * 1000
    const localTimezone = Math.abs(new Date().getTimezoneOffset() * 60 * 1000)
    const timeWithoutLocalTimezone = time * 1000 - localTimezone

    switch (Math.sign(offset)) {
        case -1: {
            const newTime = new Date(new Date((timeWithoutLocalTimezone) - Math.abs(offsetMilliseconds)))
            return `${newTime.getHours().toString().padStart(2, "0")}:${newTime.getMinutes().toString().padStart(2, "0")}`
        }
        case 1:
        case 0: {
            const new_time = new Date(new Date((timeWithoutLocalTimezone) + Math.abs(offsetMilliseconds)))
            return `${new_time.getHours().toString().padStart(2, "0")}:${new_time.getMinutes().toString().padStart(2, "0")}`
        }
    }
}
