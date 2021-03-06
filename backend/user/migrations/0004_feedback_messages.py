# Generated by Django 2.2.10 on 2021-07-12 21:28

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20210620_2315'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeedBack',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('email', models.CharField(blank=True, max_length=8024)),
                ('username', models.CharField(blank=True, max_length=256)),
                ('feeback', models.CharField(blank=True, max_length=8024)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('email', models.CharField(blank=True, max_length=8024)),
                ('username', models.CharField(blank=True, max_length=256)),
                ('feeback', models.CharField(blank=True, max_length=8024)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
