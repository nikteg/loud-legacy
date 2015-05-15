var React = require('react/addons');
var ReactApp = React.createFactory(require('../components/App'));

module.exports = function(app) {
    app.get('*', function(req, res) {
        try {
            res.render('index.ejs', { reactOutput: React.renderToString(ReactApp({ path: req.path })) });
        } catch (err) {
            res.render('error.ejs');
        }
    });
};