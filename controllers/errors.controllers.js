

exports.handleErrors = (err, req, res, next) => {
    console.log(err, "<<< error")
    res.status(err.status || 500).send({ msg: err.msg || 'Internal Server Error' })
    console.log(err)
}
