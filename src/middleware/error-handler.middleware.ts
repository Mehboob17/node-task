
export default function ErrorHandler(err, req, res, next) {
  if (err) {
    const status: number = err.status || 500;
    let body = {
      path: req.path,
      fields: err.fields,
      message: err.message || 'An error occurred during the request',
      name: err.name,
      timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' }),
      status,
    };
    return res.status(status).json(body);
  }
  next();
}
