import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_reader')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_reader"!</div>
}
