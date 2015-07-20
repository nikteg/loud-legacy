import React from 'react'
import Router from 'react-router'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import livereload from 'connect-livereload'

let server = express()

server.use(bodyParser.json()) // get information from html forms
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))
server.use(livereload({ port: 35729 }))

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs') // set up ejs for templating

import { routes } from './app'

server.use((req, res, next) => {
    var router = Router.create({ location: req.url, routes: routes })
    router.run((Handler, state) => {
        var html = React.renderToString(React.createElement(Handler))

        return res.render('index', { content: html })
    })
})

export default server
