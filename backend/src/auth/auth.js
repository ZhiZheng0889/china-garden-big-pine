const bcrypt = require('bcryptjs');
const validator = require('validator');
const nodemailer = require('nodemailer');
const passport = require('passport');
require('dotenv');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ztmdummy33782@gmail.com',
    pass: 'Wy8T3VJ6R_Ut_3c',
  },
});

passport.use(
  '2fa',
  new passport.Strategy(async function (req, done) {
    try {
      // Retrieve the user's 2FA secret from the database or file
      const user = await User.findById(req.user.id);
      if (!user) return done(new Error('User not found'));
      const secret = user.secret;
      const hashedSecret = await bcrypt.hash(secret, 10);

      await User.updateOne({ _id: req.user.id }, { secret: hashedSecret });

      // Send the 2FA code to the user's email
      const message = {
        from: 'ztmdummy33782@gmail.com',
        to: req.user.email,
        subject: 'Your 2FA code',
        text: `Your 2FA code is: ${secret}`,
      };

      console.log("Sending 2FA code: ", message); // Log the message
      
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return done(error);
        }
        console.log(info); // Log the info object
        if(info.accepted.includes(req.user.email)){
            console.log(`2FA code sent to ${req.user.email}`); // Check if the email was sent
            return done(null, info);
        }else{
            return done(new Error(`An error occurred while sending the 2FA code to ${req.user.email}`));
        }
      });
    } catch (error) {
      console.error(error);
      return done(new Error('An error occurred while sending the 2FA code'));
    }
  })
);

function send2FACode (req, res, next) {
  const async = require('async');

  const chunkSize = 10; // The number of emails to send in each chunk

  async.eachLimit(req.user.emails, chunkSize, function(email, callback) {
    const message = {
      from: 'ztmdummy33782@gmail.com',
      to: email,
      subject: 'Your 2FA code',
      text: `Your 2FA code is: ${secret}`,
    };
    transporter.sendMail(message, function (error, info) {
      if (error) {
        console.error(error);
        return callback(error);
      }
      console.log(`2FA code sent to ${email}`);
      callback();
    });
  }, function(err) {
    if (err) {
      return next({
        status: 500,
        message: 'An error occurred while sending the 2FA code'
      });
    }
    return res.status(200).json({ data: { message: '2FA code sent successfully' } });
  });
}

module.exports = send2FACode;


/**
 * import {Request, Response} from "express";
import {getRepository, MoreThanOrEqual} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from 'bcryptjs';
import {sign, verify} from 'jsonwebtoken';
import {OAuth2Client} from "google-auth-library";
import {Token} from "../entity/token.entity";

const speakeasy = require('speakeasy');

export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    if (body.password !== body.password_confirm) {
        return res.status(400).send({
            message: "Password's do not match!"
        });
    }

    const {password, tfa_secret, ...user} = await getRepository(User).save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 12),
    });

    res.send(user);
}

export const Login = async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    if (!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    if (user.tfa_secret) {
        return res.send({
            id: user.id
        });
    }

    const secret = speakeasy.generateSecret({
        name: 'My App'
    });

    res.send({
        id: user.id,
        secret: secret.ascii,
        otpauth_url: secret.otpauth_url
    });
}

export const TwoFactor = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;

        const repository = getRepository(User);

        const user = await repository.findOne(id);

        if (!user) {
            return res.status(400).send({
                message: 'Invalid credentials'
            });
        }

        const secret = user.tfa_secret !== '' ? user.tfa_secret : req.body.secret;

        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'ascii',
            token: req.body.code
        });

        if (!verified) {
            return res.status(400).send({
                message: 'Invalid credentials'
            });
        }

        if (user.tfa_secret === '') {
            await repository.update(id, {tfa_secret: secret});
        }

        const refreshToken = sign({id}, process.env.REFRESH_SECRET || '', {expiresIn: '1w'});

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        });

        const expired_at = new Date();
        expired_at.setDate(expired_at.getDate() + 7);

        await getRepository(Token).save({
            user_id: id,
            token: refreshToken,
            expired_at
        });

        const token = sign({id}, process.env.ACCESS_SECRET || '', {expiresIn: '30s'});

        res.send({
            token
        });
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    try {
        const accessToken = req.header('Authorization')?.split(' ')[1] || '';

        const payload: any = verify(accessToken, process.env.ACCESS_SECRET || '');

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const user = await getRepository(User).findOne(payload.id);

        if (!user) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const {password, tfa_secret, ...data} = user;

        res.send(data);
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}

export const Refresh = async (req: Request, res: Response) => {
    try {
        const cookie = req.cookies['refresh_token'];

        const payload: any = verify(cookie, process.env.REFRESH_SECRET || '');

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const refreshToken = await getRepository(Token).findOne({
            user_id: payload.id,
            expired_at: MoreThanOrEqual(new Date())
        });

        if (!refreshToken) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const token = sign({
            id: payload.id
        }, process.env.ACCESS_SECRET || '', {expiresIn: '30s'});

        res.send({
            token
        });
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}

export const Logout = async (req: Request, res: Response) => {
    await getRepository(Token).delete({
        token: req.cookies['refresh_token']
    });

    res.cookie('refresh_token', '', {maxAge: 0});

    res.send({
        message: 'success'
    });
}

export const GoogleAuth = async (req: Request, res: Response) => {
    const {token} = req.body;

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }

    const repository = getRepository(User);

    let user = await repository.findOne({email: payload.email});

    if (!user) {
        user = await repository.save({
            first_name: payload.given_name,
            last_name: payload.family_name,
            email: payload.email,
            password: await bcryptjs.hash(token, 12)
        });
    }

    const refreshToken = sign({
        id: user.id
    }, process.env.REFRESH_SECRET || '', {expiresIn: '1w'});

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    });

    const expired_at = new Date();
    expired_at.setDate(expired_at.getDate() + 7);

    await getRepository(Token).save({
        user_id: user.id,
        token: refreshToken,
        expired_at
    });

    res.send({
        token: sign({
            id: user.id
        }, process.env.ACCESS_SECRET || '', {expiresIn: '30s'})
    });
}

 */