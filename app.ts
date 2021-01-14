import * as express from 'express';
import appRouter from './appRouter';
import * as cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({
    statusCode: 404
  });
});

// error handler
app.use(function(err, req, res, next) {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack
  });
});

export default app;