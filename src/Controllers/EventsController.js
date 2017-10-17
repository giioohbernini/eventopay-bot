'use strict'

const fetch = require('node-fetch')
const urlApi = 'http://api-eventpayment.azurewebsites.net/api/'
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

module.exports = class EventsController extends TelegramBaseController {

  /**
  *  @param {Scope} $
  */

  allEventsAction($) {
    let msg = "Todos os eventos:"
    const methods = { method: 'GET', headers: {'Content-Type': 'application/json', 'Accept':'application/json'}}

    fetch(urlApi+"evento", methods).then((res) => {
      res.json().then((data) => {
        data.forEach((item, index) => {
          msg += "\n• "+item.Nome
        })
        $.sendMessage(msg)
      }).catch((err) => {
        msg = err
      })
    })
  }

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

  addEventAction($) {
    $.sendMessage('Opa, um evento? Vou te ajudar com isso, me diga o nome que você deseja para o seu evento')
    let response = {}
    $.waitForRequest
      .then($ => {
       // $.sendMessage(`Hmm.. Ok! Está tudo certo, seu evento ${$.message.text} foi criado!`)
        response.Nome = $.message.text
        $.sendMessage(`Agora preciso de uma descrição para adicionar junto seu evento ${$.message.text}, me diga o que deseja colocar`)

        $.waitForRequest.then($ => {
          response.Descricao = $.message.text
          $.sendMessage(`Anotado! Mas ainda falta algumas coisas, me diga o local do evento`)

          $.waitForRequest.then($ => {
            response.Local = $.message.text
            $.sendMessage(`Agora só falta o valor do evento por pessoa, qual é?`)

            $.waitForRequest.then($ => {

              response.ValorSugerido = $.message.text
              $.sendMessage(`Hmm.. Ok! Está tudo certo, seu evento ${response.Nome} foi criado!`)
              console.log(response);

            }).then(() => {

              const methods = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                },
                body: JSON.stringify(response)
              }

              fetch(urlApi+"evento", methods).then(res => {
                return res.json();
              }).then(data => {
                console.log(data);
              })
            })
          })
        })
      })
  }

  get routes() {
    return {
      'allEventsCommand': 'allEventsAction',
      'addEventCommand': 'addEventAction',
      'allUsersCommand': 'allUsersAction'
    }
  }
  }
