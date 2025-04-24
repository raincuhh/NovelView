import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_browse')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/_browse"!</div>
}
