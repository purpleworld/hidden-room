# Generated by Django 3.0.6 on 2021-03-19 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Chat', '0017_auto_20210319_2128'),
    ]

    operations = [
        migrations.AlterField(
            model_name='privatemessage',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
