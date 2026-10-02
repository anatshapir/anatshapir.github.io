import React from "react";
import { MaterialsProvider } from "@/context/MaterialsContext";
import { AdminPanel } from "@/components/Admin";
import { TopicPage } from "@/components/sections/TopicPage";
import { useMaterials } from "@/context/MaterialsContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/approved/home";
import CategoryPage from "@/approved/category-page";
import GeneralArea from "@/approved/general-area";
import ContentDetail from "@/approved/content-detail";
import ApprovedLayout from "@/approved/layout";
import { useLocation } from "@/approved/router";
import { LearningTopicPage } from "@/approved/learning-topics";
import { useContentCatalog } from "@/approved/content-catalog";
import "./approved/approved.css";

function RoutedPage() {
  const [location] = useLocation();
  const { materials: legacyMaterials } = useMaterials();
  const catalog = useContentCatalog();
  const queryAt = location.indexOf("?");
  const pathname = queryAt < 0 ? location : location.slice(0, queryAt);
  const topicMatch = pathname.match(/^\/topic\/(.+)$/);
  if (topicMatch) {
    const segments: string[] = [];
    try {
      topicMatch[1].split("/").forEach((segment) => {
        const decoded = decodeURIComponent(segment);
        if (!decoded.trim()) throw new Error("Invalid topic segment");
        segments.push(decoded);
      });
    } catch {
      return <NotFoundPage />;
    }
    const isGeneral = (catalog.data?.materials ?? legacyMaterials).some(
      (item) => item.category === "general" && item.path[0] === segments[0],
    );
    return isGeneral ? <TopicPage pathSegments={segments} /> : <LearningTopicPage pathSegments={segments} />;
  }
  if (pathname === "/") return <Home />;
  if (pathname === "/admin") return <AdminPanel />;
  if (pathname === "/teaching-materials" || pathname === "/materials") return <CategoryPage slug="learn" />;
  if (pathname === "/general" || pathname === "/interesting") return <GeneralArea />;
  const categoryMatch = pathname.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    let slug = "";
    try {
      slug = decodeURIComponent(categoryMatch[1]);
    } catch {
      return <NotFoundPage />;
    }
    return <CategoryPage slug={slug} />;
  }
  const detailMatch = pathname.match(/^\/content\/([^/]+)$/);
  if (detailMatch) return <ContentDetail id={detailMatch[1]} />;
  return <NotFoundPage />;
}

function NotFoundPage() {
  return <section className="not-found-page" dir="rtl"><h1>העמוד לא נמצא</h1><p>הקישור הזה לא מוביל לעמוד באתר.</p><a href="#/">חזרה לדף הבית</a></section>;
}

export default function App() {
  return <MaterialsProvider><AppFrame /></MaterialsProvider>;
}

function AppFrame() {
  const [location] = useLocation();
  const pathname = location.split("?")[0];
  const { materials } = useMaterials();
  const catalog = useContentCatalog();
  React.useEffect(() => {
    if (window.location.hash !== "#categories") window.scrollTo(0, 0);
  }, [location]);
  const topicPath = pathname.startsWith("/topic/") ? pathname.slice("/topic/".length).split("/").map((part) => {
    try { return decodeURIComponent(part); } catch { return ""; }
  }) : [];
  const generalTopic = topicPath.length > 0 && (catalog.data?.materials ?? materials).some(
    (item) => item.category === "general" && item.path[0] === topicPath[0],
  );
  const preserveLegacyShell = pathname.startsWith("/topic/") && generalTopic;
  return (
    preserveLegacyShell ? (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <main className="relative z-10"><RoutedPage /></main>
        <Footer />
      </div>
    ) : (
      <ApprovedLayout><RoutedPage /></ApprovedLayout>
    )
  );
}