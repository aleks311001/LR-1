import smtplib
from django.conf import settings
# import settings


def send_mail(email, username):
    # with open('password.txt', 'r') as file:
    #     password = file.read()

    server = smtplib.SMTP_SSL(settings.ADMIN_EMAIL_PROTOCOL)
    server.ehlo()
    server.login(settings.ADMIN_EMAIL, settings.ADMIN_PASSWORD)

    text = f'From: {settings.ADMIN_EMAIL}\r\n' \
           f'To: {email}\r\n' \
           f'Subject: Hello, {username}!\r\n\r\n' \
           f'Thank you for registration\r\n'

    server.sendmail(settings.ADMIN_EMAIL, [email], text)
    server.close()
