# -*- coding=utf-8 -*-
from __future__ import unicode_literals

from vulyk.blueprints.gamification.models.task_types import (
    AbstractGamifiedTaskType, POINTS_PER_TASK_KEY, COINS_PER_TASK_KEY,
    IMPORTANT_KEY)

from vulyk_judges.models.tasks import JudgesAnswer, JudgesTask


class JudgesTaskType(AbstractGamifiedTaskType):
    """
    Judges Task to work with Vulyk.
    """
    answer_model = JudgesAnswer
    task_model = JudgesTask

    name = "Зв'язки суддів"
    description = "Розпізнавання родинних зв'язків суддів"

    template = 'index.html'
    type_name = 'judges_task'

    redundancy = 3

    _task_type_meta = {
        POINTS_PER_TASK_KEY: 2.0,
        COINS_PER_TASK_KEY: 1.0,
        IMPORTANT_KEY: False
    }

    JS_ASSETS = ['static/scripts/jquery-ui.min.js',
                 'static/scripts/handlebars.js',
                 'static/scripts/jquery.validate.min.js',
                 'static/scripts/messages_uk.min.js',
                 'static/scripts/jquery-cloneya.min.js',
                 'static/scripts/jquery.dateSelectBoxes.js',
                 'static/scripts/jquery.placeholder.min.js',
                 'static/scripts/jquery.serializejson.js',
                 'static/scripts/bootstrap-datepicker.min.js',
                 'static/scripts/data.js',
                 'static/scripts/main.js']

    CSS_ASSETS = ['static/styles/bootstrap-datepicker3.min.css',
                  'static/styles/core-style.css',
                  'static/styles/style.css']
