import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/snippetEditForm';

interface SnippetEditPageProps {
    params: {
        id: string
    }
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
    const id = parseInt(props.params.id) // convert id from string to number
    const snippet = await db.snippet.findFirst({ // query db for first matching record
        where: { id } // looking for record with id matching id from props
    })

    if(!snippet) {
        return notFound(); // if snippet is not found return early and call notFound()
    }

    return (
        <div>
            <SnippetEditForm snippet={snippet} /> {/*passing props to snippetEditForm*/}
        </div>
    )
}