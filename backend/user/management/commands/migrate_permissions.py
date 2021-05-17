from store.scripts import PopulatePermissions
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Migrate Roles and Permissions'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.populate = PopulatePermissions()

    def handle(self, *args, **kwargs):
        self.populate.populate_database()
