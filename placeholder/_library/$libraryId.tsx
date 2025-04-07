import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_library/$libraryId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_library/$libraryId"!</div>
}
