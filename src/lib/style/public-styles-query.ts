/**
 * Shared query key for the anonymous public style catalogue, used to keep its
 * cache entry aligned with `useStyles` across the landing page and workspace.
 */
export const publicStylesQueryKey = ['styles', 'list', 'public'] as const;
