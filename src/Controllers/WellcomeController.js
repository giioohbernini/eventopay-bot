'use strict'

const fetch = require('node-fetch')
const urlApi = 'http://api-eventpayment.azurewebsites.net/api/'
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

module.exports = class WellcomeController extends TelegramBaseController {
  /**
  *  @param {Scope} $
  */

  wellcomeAction($) {
    $.sendMessage("Eae, beleza? Eu sou o bot eventpay e irei te ajudar por aqui! Caso precise de mim e só chamar")
  }

  get routes() {
    return {
      'wellcomeCommand': 'wellcomeAction'
    }
  }
}

