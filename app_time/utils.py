def format_hours(hours):
    minutes = hours - int(hours)
    if minutes:
        formatted_hours = f"{int(hours)} hours {int(round(minutes * 100, 2))} minutes"
    else:
        formatted_hours = f"{int(hours)} hours"
    return formatted_hours


def format_total_hours(hours):
    hours = list(hours)
    minutes = sum((int(hour) * 60) + int(round((hour - int(hour)) * 100, 2)) for hour in hours)
    
    hours = int(minutes / 60)
    minutes = round((minutes - hours * 60) / 100, 2)
    hours = hours + minutes
    return format_hours(hours)