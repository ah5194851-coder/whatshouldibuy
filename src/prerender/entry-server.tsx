import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { getPageMetadata, PageMetadata } from './pageMetadata';
import { getAllRoutes, RouteConfig } from './routes';
import { SITE_URL, SITE_NAME } from '../config/site';

export interface RenderResult {
  html: string;
  metadata: PageMetadata;
}

export function render(url: string): RenderResult {
  const metadata = getPageMetadata(url);
  const html = renderToString(<App initialPath={url} />);
  return { html, metadata };
}

export { getAllRoutes, SITE_URL, SITE_NAME };
export type { RouteConfig, PageMetadata };
