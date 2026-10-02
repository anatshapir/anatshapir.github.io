type CatalogStatusProps = {
  query: {
    isPending: boolean;
    isError: boolean;
    refetch: () => unknown;
  };
};

export default function CatalogStatus({ query }: CatalogStatusProps) {
  if (query.isPending) {
    return <p className="category-empty" role="status">טוענים את התוכן מהאתר של ענת…</p>;
  }
  if (query.isError) {
    return (
      <div className="category-empty" role="alert">
        <h2>לא הצלחנו לטעון את התוכן</h2>
        <p>התוכן מגיע מהאתר של ענת. בדקו את החיבור ונסו שוב.</p>
        <button type="button" className="text-link" onClick={() => query.refetch()}>
          ניסיון נוסף
        </button>
      </div>
    );
  }
  return null;
}