import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legal)/legal/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(legal)/legal/privacy-policy"!</div>
}
