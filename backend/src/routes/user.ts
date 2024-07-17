import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {signininput, signupinput} from "@siddhant1234/commonmodulesi"
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();


userRouter.post('/signup', async (c) => {
  console.log('inside the post signup')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  console.log(body)
  const {success} = signupinput.safeParse(body);
  
  if(!success) {
    c.status(404);
    return c.json({mes:'not valid gmail'});
  }
  console.log(body);
  const ch = await prisma.user.findFirst({
    where:{
      email:body.email
    }
  })
  console.log(" ch is " , ch)
  if(ch) {
    c.status(404)
   return  c.json({
      mes:'user already exit '
    })
  }
  try {
    console.log('ins')
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password 
      }
    });
    console.log('inside')
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log('jwt is ', jwt)
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: 'error while sign up' });
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } }
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signininput.safeParse(body);
  if(!success) {
    c.status(403);
    return c.json({mes: 'not valid data' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email }
    });
    if (!user) return c.json({ message: 'user not found' });
    if (user.password !== body.password) return c.json({ message: 'invalid password' });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt
    });
  } catch (e) {
    return c.text('error has occurred');
  }
});
