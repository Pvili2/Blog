
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(new Error(err.message)))
    }
}

module.exports = catchAsync;