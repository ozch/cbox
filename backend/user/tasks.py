import datetime
from background_task import background
from background_task.models import Task
from user.operations import OrganizationOperations
from notification.managers import NotificationManager, notification_code


@background(schedule=Task.DAILY)
def subscription_expiry_sub_routine():
    organizations = OrganizationOperations().get_all_queryset()
    current_date = datetime.datetime.now().date()
    for organization in organizations:
        if organization.sub_expiry <= current_date:
            nm = NotificationManager(notification_code.DEACTIVATE_EXPIRY)
            nm.notify_all_organization_devices(organization_id=organization.id)


def schedule_subscription_expiry_sub_routine():
    subscription_expiry_sub_routine(repeat=Task.DAILY, remove_existing_tasks=True)
