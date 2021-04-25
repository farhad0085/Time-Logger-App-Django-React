import os
import xlsxwriter
import datetime
from django.conf import settings
from os.path import isfile, join


def format_time(minutes):
    hours = int(minutes / 60)

    minutes = minutes - (hours * 60)
    if minutes:
        formatted_time = f"{int(hours)} hours {round(minutes)} minutes"
    else:
        formatted_time = f"{int(hours)} hours"

    return formatted_time


def create_excel_file(response):

    # delete old files
    empty_folder(join(settings.MEDIA_ROOT, 'excel'), ['.gitignore'])

    dt_str = str(int(datetime.datetime.now().timestamp()))
    date_str = str(datetime.date.today())

    filename = f"Data_{date_str}_{dt_str}.xlsx"

    # Create an new Excel file and add a worksheet.
    workbook = xlsxwriter.Workbook(join(settings.MEDIA_ROOT, 'excel', filename))

    for item in response:

        worksheet = workbook.add_worksheet(item["company"])

        # Widen the columns to make the text clearer.
        worksheet.set_column('A:A', 20)
        worksheet.set_column('B:B', 20)
        worksheet.set_column('C:C', 20)
        worksheet.set_column('D:D', 30)
        worksheet.set_column('E:E', 30)

        # Add a bold format to use to highlight cells.
        bold = workbook.add_format({'bold': True})

        # Adding company name and date range
        worksheet.write('C1', item["company"], bold)
        worksheet.write('C2', item["date_range"], bold)

        n = 3
        for user in item["data"]:
            worksheet.write_row(n, 0, ['username', 'date', 'time', 'injury_noted', 'policy_violation_noted'], bold)
            n += 1
            for item in user['data']:
                worksheet.write_row(n, 0,
                    [user['user'], item["date"], item["time"], item['injury_noted'], item['policy_violation_noted']])
                n += 1
            worksheet.write_row(n, 0,
                [user['user'], 'total', user['total']['time'], user['total']['injury_noted'], user['total']['policy_violation_noted']], bold)
            n += 2

    workbook.close()
    return filename


def empty_folder(folder_path, excludes=[]):
    # list all but last 5 files
    only_files = [f for f in os.listdir(folder_path) if isfile(join(folder_path, f))][:-5]
    only_files = sorted(only_files)

    # delete all file but the files in excludes
    for file in only_files:
        if file in excludes:
            continue

        filepath = join(folder_path, file)
        os.remove(filepath)