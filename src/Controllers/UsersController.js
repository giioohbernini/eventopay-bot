'use strict'

const fetch = require('node-fetch')
const urlApi = 'http://api-eventpayment.azurewebsites.net/api/'
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

module.exports = class UsersController extends TelegramBaseController {
  /**
  *  @param {Scope} $
  */

  allUsersAction($) {
    let msg = "Todos usuários:"
    const methods = { method: 'GET', headers: {'Content-Type': 'application/json', 'Accept':'application/json'}}

    fetch(urlApi+"usuario", methods).then((res) => {
      res.json().then((data) => {
        data.forEach((item, index) => {
          msg += "\n• "+item.Nome
        })
        $.sendMessage(msg)
      }).catch((err) => {
        console.log('Error: ', err)
        msg = err
      })
    })
  }

  get routes() {
    return {
      'allUsersCommand': 'allUsersAction'
    }
  }
}

