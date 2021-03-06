# Generated by Django 2.2 on 2019-05-15 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wiki', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFileUpload',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload', models.FileField(upload_to='uploads/')),
            ],
        ),
        migrations.RemoveField(
            model_name='page',
            name='id',
        ),
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(max_length=64, primary_key=True, serialize=False),
        ),
    ]
