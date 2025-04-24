import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_library/$libraryId/$bookId/chapters')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_library/$libraryId/$bookId/chapters"!</div>
}
