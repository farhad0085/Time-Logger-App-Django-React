# Generated by Django 3.1.7 on 2021-03-14 06:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20210314_1246'),
        ('app_time', '0002_auto_20210314_1114'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timelog',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.company'),
        ),
    ]
