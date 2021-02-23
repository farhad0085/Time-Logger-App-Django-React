def format_time(minutes):
    hours = int(minutes / 60)

    minutes = minutes - (hours * 60)
    if minutes:
        formatted_time = f"{int(hours)} hours {round(minutes)} minutes"
    else:
        formatted_time = f"{int(hours)} hours"

    return formatted_time
