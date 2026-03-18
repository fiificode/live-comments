import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('thread/:topicId', 'routes/thread.$topicId.tsx'),
] satisfies RouteConfig
