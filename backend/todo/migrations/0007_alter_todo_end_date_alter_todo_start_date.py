# Generated by Django 4.1.9 on 2023-09-25 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0006_alter_todo_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='end_date',
            field=models.CharField(default='25/09/2023 - 19:09', max_length=10),
        ),
        migrations.AlterField(
            model_name='todo',
            name='start_date',
            field=models.CharField(default='25/09/2023 - 19:09', max_length=5000),
        ),
    ]