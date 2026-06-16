type RouteScope = 'admin' | 'client' | 'common';

function normalizeSegment(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

export function buildVersionedRoute(scope: RouteScope, domain: string, version: number): string {
  const normalizedDomain = normalizeSegment(domain);
  const normalizedVersion = `v${String(version).replace(/^v/i, '')}`;
  if (scope === 'common') {
    return `${normalizedVersion}/${normalizeSegment(domain)}`;
  }
  return `${scope}/${normalizedVersion}/${normalizedDomain}`;
}
