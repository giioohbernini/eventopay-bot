'use strict'

const request = require('request')
const fetch = require('node-fetch')
const urlApi = 'https://gigio-nodeapi.herokuapp.com/produtos'
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const chatbot = new Telegram.Telegram('353673799:AAFDUQh6WxKZzkTfTdBn44nYRwyYB0CfeoQ')


class EventsController extends TelegramBaseController {
  /**
  *  @param {Scope} $
  */

  allEventsAction($) {
    let msg = "Todos os seus eventos"
    const methods = { method: 'GET', headers: {'Content-Type': 'application/json', 'Accept':'application/json'}}

    fetch(urlApi, methods).then((res) => {
      console.log('dentro do then')
      res.json().then((data) => {
        console.log(data)
        data.forEach((item, index) => {
          msg += "\n• "+item.titulo
        })
        $.sendMessage(msg)
      }).catch((err) => {
        console.log('Error: ', err)
        msg = err
      })
    })
  }

  addEventAction($) {
    $.sendMessage('Opa, um evento? Vou te ajudar com isso, me diga o nome que você deseja para o seu evento')
    $.waitForRequest
      .then($ => {
        events.push($.message.text)
        $.sendMessage(`Hmm.. Ok! Está tudo certo, seu evento ${$.message.text} foi criado!`)
      })
  }

  get routes() {
    return {
      'allEventsCommand': 'allEventsAction',
      'addEventCommand': 'addEventAction'
    }
  }
}

chatbot.router
  .when(
    new TextCommand('/allevents', 'allEventsCommand'),
    new EventsController()
  )
  .when(
    new TextCommand('/addevent', 'addEventCommand'),
    new EventsController()
  )
