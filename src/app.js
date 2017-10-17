'use strict'

const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const chatbot = new Telegram.Telegram('353673799:AAFDUQh6WxKZzkTfTdBn44nYRwyYB0CfeoQ')
const EventsController = require('./Controllers/EventsController')
const UsersController = require('./Controllers/UsersController')
const WellcomeController = require('./Controllers/WellcomeController')

chatbot.router
  .when(
    new TextCommand('/allevents', 'allEventsCommand'),
    new EventsController()
  )
  .when(
    new TextCommand('/addevent', 'addEventCommand'),
    new UsersController()
  )
  .when(
    new TextCommand('/allusers', 'allUsersCommand'),
    new EventsController()
  )
  .when(
    new TextCommand('/start', 'wellcomeCommand'),
    new WellcomeController()
  )
