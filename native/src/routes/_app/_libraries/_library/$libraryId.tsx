import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_libraries/_library/$libraryId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/_libraries/_library/$libraryId"!</div>
}
