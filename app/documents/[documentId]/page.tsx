import Editor from '@/app/documents/[documentId]/editor'
import Toolbar from '@/app/documents/[documentId]/toolbar'
type Props = {
    params: {
      documentId: string;
    };
  };
  
  export default async function DocumentPage({ params }: Props) {
    const { documentId } = await params

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-foreground">
          Document ID: {documentId}
        </h1>
        <Toolbar />
        <Editor />
      </div>
    );
  }