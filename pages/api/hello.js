// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from 'cookie';
const jwt = require('jsonwebtoken');

export default function handler(req, res) {
  res.setHeader('set-cookie', serialize('test2', '1234'))
  res.status(200).json({t: 'd'})
}
