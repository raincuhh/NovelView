import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_reader/$bookId/$chapterId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_reader/$bookId/$chapterId"!</div>
}
