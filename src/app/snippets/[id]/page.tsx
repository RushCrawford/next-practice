import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/db'
import * as actions from '@/actions/actions'

interface SnippetShowPageProps {
    params:{
        id: string
    }
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    await new Promise((r)=> setTimeout(r,500)) // artificial pause to show loading.tsx page

    const snippet = await db.snippet.findFirst({ // query db for first record to match conditions
        where: { id: parseInt(props.params.id) } // setting condition that if id === props.params.id fetch that record, and parseInt() turns it to type number
    })

    if (!snippet) {
        return notFound(); // if no matching record is found will redirect to not found page
    }

    const deleteSnippetAction = actions.DeleteSnippet.bind(null, snippet.id)

    return (
        <div>
            <div className='flex m-4 justify-between items-center'>
                <h1 className='text-xl font-bold'>{snippet.title}</h1>
            </div>
            <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
                <code>{snippet.code}</code>
            </pre>
            <div className='flex gap-4'>
                <Link 
                className='p-2 border rounded'
                href={`/snippets/${snippet.id}/edit`}
                >Edit</Link>
                <form action={deleteSnippetAction}>
                <button className='p-2 border rounded'>Delete</button>
                </form>
            </div>
        </div>
    )
}