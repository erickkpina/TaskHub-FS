# Generated by Django 4.1.9 on 2023-09-25 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0010_alter_todo_end_date_alter_todo_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='end_date',
            field=models.CharField(default='25/09/2023 - 19:15', max_length=16),
        ),
        migrations.AlterField(
            model_name='todo',
            name='start_date',
            field=models.CharField(default='25/09/2023 - 19:15', max_length=16),
        ),
    ]