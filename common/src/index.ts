import z from 'zod'

export const signupinput = z.object({
    email:z.string().email(),
    password:z.string().min(4),
    name:z.string()
})
export type signupinput = z.infer<typeof signupinput>;
export const signininput = z.object({
    email: z.string().email(),
    password:z.string().min(3)
})  
export type signininput = z.infer<typeof signininput>;
export const createpost = z.object({
    title:z.string(),
    content:z.string()
})

export type createpost = z.infer<typeof createpost>;
export const forupdate = z.object({
    title:z.string().optional(),
    content:z.string().optional()
})
export type forupdate = z.infer<typeof forupdate>;

// console.log(forupdate)