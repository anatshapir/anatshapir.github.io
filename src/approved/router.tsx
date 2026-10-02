import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

type RouteLocation = { pathname: string; search: string };

function readLocation(): RouteLocation {
  const raw = window.location.hash.slice(1);
  const queryAt = raw.indexOf("?");
  const route = queryAt < 0 ? raw : raw.slice(0, queryAt);
  const search = queryAt < 0 ? "" : raw.slice(queryAt);
  if (!route || route === "/" || route === "categories") return { pathname: "/", search };
  if (route === "materials" || route === "/materials") return { pathname: "/category/learn", search };
  if (route === "interesting" || route === "/interesting") return { pathname: "/general", search };
  if (route === "admin" || route === "/admin") return { pathname: "/admin", search };
  if (route.startsWith("topic/")) return { pathname: `/${route}`, search };
  return { pathname: route.startsWith("/") ? route : `/${route}`, search };
}

export function toHashHref(href: string): string {
  if (!href || href === "#") return "#/";
  if (href.startsWith("#")) return href;
  return `#${href.startsWith("/") ? href : `/${href}`}`;
}

export function useLocation(): [string, (next: string) => void] {
  const [location, setLocationState] = useState(() => readLocation());
  useEffect(() => {
    const update = () => setLocationState(readLocation());
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  const setLocation = (next: string) => {
    window.location.hash = toHashHref(next).slice(1);
  };
  return [`${location.pathname}${location.search}`, setLocation];
}

export function useSearch(): string {
  const [location] = useLocation();
  const queryAt = location.indexOf("?");
  return queryAt < 0 ? "" : location.slice(queryAt);
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function Link({ href, children, onClick, ...props }: LinkProps) {
  return <a href={toHashHref(href)} {...props} onClick={(event) => {
    onClick?.(event);
    if (href === "/" && !event.defaultPrevented && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      window.scrollTo(0, 0);
    }
  }}>{children}</a>;
}
