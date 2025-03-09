import csv
from django.core.management.base import BaseCommand
from workouts.models import Exercise

class Command(BaseCommand):
    help = 'Load exercises from a CSV file'

    def handle(self, *args, **kwargs):
        with open('table_processed.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Exercise.objects.create(
                    name=row['Exercise'],
                    description=f"Difficulty: {row['Difficulty_Level']}, Target Muscle Group: {row['Target_Muscle_Group']}",
                    duration=5  # Set a default duration, as it's not in the CSV
                )
                self.stdout.write(f"Added {row['Exercise']}")