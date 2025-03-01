export function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let timeString = '';
    
    if (hours > 0) {
        timeString += `${hours} hr`;
        if (minutes > 0 || seconds > 0) {timeString += ' : ';}
    }
    
    if (minutes > 0) {
        timeString += `${minutes} min`;
        if (seconds > 0 && hours === 0) {timeString += ' : ';} // Only show seconds separator if no hours
    }
    
    if (seconds > 0 && (hours === 0 || minutes === 0)) {
        timeString += `${seconds}s`; // Show seconds if no hours or only hours
    } else if (seconds > 0) {
        timeString += `${seconds}s`; // Include seconds if there are hours and minutes
    }

    return timeString || '0s'; // Default to '0s' if no time
}
