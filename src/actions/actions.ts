'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db'

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id }, // specify which piece of data to update
        data: { code } // what to update with
    })

    redirect(`/snippets/${id}`)
}

export async function DeleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    }),
        redirect('/')
}

export async function createSnippet(
    formState: { message: string },
    formData: FormData
) {
    try {

    // check user input to make sure its valid
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== "string" || title.length < 3) {
        return {
            message: 'Title must be longer'
        }
    };
    if (typeof code !== "string" || code.length < 10) {
        return {
            message: 'Add more code'
        }
    };

    // create new record in db
    await db.snippet.create({
        data: {
            title,
            code
        }
    })

} catch (err: unknown) { 
    if (err instanceof Error) {
        return {
            message: err.message
        }
    } else {
        return {
            message: 'Looks like something went wrong...'
        }
    }
}

    // redirect to home page
    redirect('/');
}