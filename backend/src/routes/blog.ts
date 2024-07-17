import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt';
import { createpost, forupdate } from "@siddhant1234/commonmodulesi";

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

bookRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    c.set('userId', payload.id);
    await next();
});

bookRouter.post('/createblogfor', async (c) => {
    const id = c.get('userId');
    console.log('inside ')
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createpost.safeParse(body);
    if (!body) {
        c.status(402);
        return c.text('not valid data ')
    }
    const post = await prisma.post.create({
        data: {
            title: body.title,
            authorId: id,
            content: body.content
        }
    });

    return c.json({ message: 'created successfully', post });
});

bookRouter.post('/singleupdate', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());

    const { success } = forupdate.safeParse(body);
    if (!success) {
        c.status(403)
        return c.text('not valid input ')
    }

    const userId = c.get('userId');
    await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.text('updated post');
});

bookRouter.get('/bulk', async (c) => {
    console.log('inside the bulk ')
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());
    console.log('inside the bulk ')
    const posts = await prisma.post.findMany();
    console.log('post s are ', posts)
    return c.json({ data: posts });
});

bookRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    console.log(id, 'inside the get ')
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
        where: { authorId: id }
    });
    console.log('post is ', post)

    return c.json({ post });
});


