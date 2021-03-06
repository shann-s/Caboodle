import { Collection } from '../models/collection.model';
import { eventEmitter } from './../../architecture/event-emitter';
import { User } from '../models/user.model';
import * as express from 'express';
import { USER_CREATED_EVENT } from '../events/user-created-event';
import { environment } from './../../environment.server';
import fetch from 'node-fetch';
import * as clientEnv from '../../../environments/environment.prod';

export const router = express.Router();

router.param('userId', (req: any, res, next, id) => {
  User.findById(id, {
    include: [
      { model: Collection, as: 'bookmarks' },
      { model: Collection, as: 'collections' },
    ],
    attributes: {
      exclude: ['password', 'salt', 'updatedAt']
    }
  })
  .then((user) => {
    req.user = user;
    next();
  });
});

router.get('/user/:userId', async (req: any, res, next) => {
  if (!req.auth) {
    next({
      status: 401,
      message: 'not authorized',
    });
  } else if (req.user) {
    for (const c of req.user.bookmarks) {
      await c.attatchEndpoints();
    }
    for (const c of req.user.collections) {
      await c.attatchEndpoints();
    }
    res.json(req.user);
  } else {
    next({
      status: 404,
      message: 'user does not exist',
    });
  }
});

router.post('/user', (req, res, next) => {
  fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${environment.captchaKey}&response=${req.query.token}`, {
    method: 'POST'
  })
  .then(result => result.json())
  .then(captcha => {
    if (captcha && captcha.success) {
      const user = User.build({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
      user.validate({skip: ['password', 'salt']})
      .then(error => {
        if (error) {
          res.status(400).json({ error: error.errors });
        }  else {
          user.save()
          .then(u => {
            res.send();
            eventEmitter.emit(USER_CREATED_EVENT, u);
          })
          .catch(err => {
            if (err.message === 'Validation error') {
              res.status(400).json({ error: err.errors });
            } else {
              next(err);
            }
          });
        }
      })
      .catch(next);
    } else {
      res.status(400).json({error: 'invalid captcha token'});
    }
  })
  .catch(next);
});

router.put('/user/:userId', (req: any, res, next) => {
  if (!req.auth || !req.user || req.user.id !== req.auth.id) {
    res.send(401);
  } else {
    (<User>req.user).updateAttributes({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(() => {
      res.json(req.user);
    })
    .catch(next);
  }
});

router.post('/user/:userId/collection/:collectionId', (req: any, res, next) => {
  if (!req.auth || !req.user || req.user.id !== req.auth.id) {
    res.send(401);
  } else {
    Collection.findById(req.params.collectionId)
    .then(collection => collection ? req.user.addBookmark(collection) : new Promise(resolve => resolve()))
    .then(() => (<User>req.user).reload({
      include: [
        { model: Collection, as: 'bookmarks' },
        { model: Collection, as: 'collections' },
      ],
      attributes: {
        exclude: ['password', 'salt', 'updatedAt']
      }
    }))
    .then((user) => {
      res.json(user);
    })
    .catch(next);
  }
});

router.delete('/user/:userId/collection/:collectionId', (req: any, res, next) => {
  if (!req.auth || !req.user || req.user.id !== req.auth.id) {
    res.send(401);
  } else {
    Collection.findById(req.params.collectionId)
    .then(collection => collection ? req.user.removeBookmark(collection) : new Promise(resolve => resolve()))
    .then(() => (<User>req.user).reload({
      include: [
        { model: Collection, as: 'bookmarks' },
        { model: Collection, as: 'collections' },
      ],
      attributes: {
        exclude: ['password', 'salt', 'updatedAt']
      }
    }))
    .then((user) => {
      res.json(user);
    })
    .catch(next);
  }
});

router.get('/me', (req: any, res, next) => {
  if (!req.auth) {
    res.send(401);
    return;
  } else {
    res.redirect(`/${clientEnv.environment.api}user/${req.auth.id}`);
  }
});
