import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_library/$libraryId/$bookId/toc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_library/$libraryId/$bookId/toc"!</div>
}
