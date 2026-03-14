// ============================================================
// חומרי למידה והמלצות
// כדי להוסיף חומר חדש: העתיקי בלוק ושני את הפרטים
// כדי להוסיף נושא חדש: הוסיפי ערך ב-subcategoryMeta
// path מגדיר את ההיררכיה: ['נושא', 'תת-נושא', 'תת-תת-נושא', ...]
// ============================================================

// תמיכה בפורמט ישן (subcategory+subSubcategory) וחדש (path)
export interface StaticMaterial {
  id: string
  title: string
  description: string
  category: 'teaching' | 'general'
  path: string[]
  linkUrl: string
  icon: string
}

// נרמול: אם חומר עם subcategory ובלי path, ממיר אוטומטית
function normalizeMaterial(m: any): StaticMaterial {
  if (m.path && m.path.length > 0) return m as StaticMaterial
  const path: string[] = []
  if (m.subcategory) path.push(m.subcategory)
  if (m.subSubcategory) path.push(m.subSubcategory)
  return { ...m, path }
}

// מטא-דאטה לכל נושא - אייקון וצבע לכרטיס
export const subcategoryMeta: Record<string, { icon: string; color: string }> = {
  'רקורסיה': {'icon':'🔄','color':'from-orange-50 to-amber-50 border-orange-200'},
  'מדעי המחשב': {'icon':'💻','color':'from-blue-50 to-indigo-50 border-blue-200'},
  'מדעי הנתונים': {'icon':'📊','color':'from-purple-50 to-fuchsia-50 border-purple-200'},
  'פיתוח ווב': {'icon':'🌐','color':'from-emerald-50 to-teal-50 border-emerald-200'},
  'ספרים': {'icon':'📚','color':'from-amber-50 to-yellow-50 border-amber-200'},
  'השראה': {'icon':'✨','color':'from-rose-50 to-pink-50 border-rose-200'},
  'שירים': {'icon':'🎵','color':'from-violet-50 to-purple-50 border-violet-200'},
  'המלצות': {'icon':'⭐','color':'from-sky-50 to-cyan-50 border-sky-200'},
  'EDA': {'icon':'📉','color':'from-purple-50 to-violet-50 border-purple-200'}
}

export const staticMaterials: StaticMaterial[] = ([
  {
    id: 'recursive-thinking',
    title: 'חשיבה רקורסיבית',
    description: 'מדריך מקיף לחשיבה רקורסיבית - מהבסיס ועד לפתרון בעיות מורכבות.',
    category: 'teaching',
    path: ['רקורסיה'],
    linkUrl: '/recursiveThinking.html',
    icon: '🧠',
  },
  {
    id: 'recursion-visualization',
    title: 'הדמיית זמן ריצה של רקורסיה',
    description: 'כלי אינטראקטיבי להמחשת זמן ריצה של פונקציות רקורסיביות.',
    category: 'teaching',
    path: ['רקורסיה'],
    linkUrl: '/recursionVisualization.html',
    icon: '📊',
  },
  {
    id: 'bintree-recursion',
    title: 'רקורסיה על עצים בינאריים',
    description: 'מדריך לרקורסיה על עצים בינאריים עם הדמיות והסברים מפורטים.',
    category: 'teaching',
    path: ['רקורסיה'],
    linkUrl: '/bintree_recursion.html',
    icon: '🌳',
  },
  {
    id: 'recursion-escape-advanced',
    title: 'חדר בריחה - רקורסיה מתקדם',
    description: 'תרגיל אינטראקטיבי בסגנון חדר בריחה לתרגול רקורסיה ברמה מתקדמת.',
    category: 'teaching',
    path: ['רקורסיה'],
    linkUrl: '/recursionEscapeRoom.html',
    icon: '🔑',
  },
  {
    id: 'recursion-escape',
    title: 'חדר בריחה - רקורסיה',
    description: 'משחק חדר בריחה ללימוד רקורסיה בצורה חווייתית ומהנה.',
    category: 'teaching',
    path: ['רקורסיה'],
    linkUrl: '/recursive_labyrinth.html',
    icon: '🏰',
  },
  {
    id: 'bfs-dfs',
    title: 'BFS & DFS',
    description: 'הדמיה אינטראקטיבית של אלגוריתמי חיפוש BFS ו-DFS בגרפים.',
    category: 'teaching',
    path: ['מדעי המחשב'],
    linkUrl: '/bfs_dfs.html',
    icon: '🔍',
  },
  {
    id: 'regular-languages',
    title: 'שפות רגולריות',
    description: 'מדריך מקיף לשפות רגולריות, אוטומטים וביטויים רגולריים.',
    category: 'teaching',
    path: ['מדעי המחשב'],
    linkUrl: '/regularLanguages.html',
    icon: '📜',
  },
  {
    id: 'java-exercise',
    title: 'פותר תרגילי Java',
    description: 'כלי אינטראקטיבי לפתרון תרגילים בשפת Java.',
    category: 'teaching',
    path: ['מדעי המחשב'],
    linkUrl: '/javaExercise.html',
    icon: '☕',
  },
  {
    id: 'track-table',
    title: 'טבלת מעקב',
    description: 'כלי לבניית טבלאות מעקב (Trace Table) לתרגילי תכנות.',
    category: 'teaching',
    path: ['מדעי המחשב'],
    linkUrl: '/trackTable.html',
    icon: '📋',
  },
  {
    id: 'datascience-project',
    title: 'מבוא למדעי הנתונים',
    description: 'מבוא למדעי הנתונים - מושגי יסוד, כלים וטכניקות בסיסיות.',
    category: 'teaching',
    path: ['מדעי הנתונים'],
    linkUrl: '/datascience-project.html',
    icon: '📈',
  },
  {
    id: 'eda',
    title: 'EDA',
    description: 'וידאו הסבר',
    category: 'teaching',
    path: ['מדעי הנתונים', 'EDA'],
    linkUrl: 'eda_video.mp4',
    icon: '📖',
  },
  {
    id: 'pandas',
    title: 'מדריך Pandas',
    description: 'מדריך מקיף לספריית Pandas - עיבוד וניתוח נתונים ב-Python.',
    category: 'teaching',
    path: ['מדעי הנתונים'],
    linkUrl: '/pandas.html',
    icon: '🐼',
  },
  {
    id: 'html-guide',
    title: 'מדריך HTML & VS Code',
    description: 'מדריך מקיף ל-HTML ולסביבת העבודה Visual Studio Code.',
    category: 'teaching',
    path: ['פיתוח ווב'],
    linkUrl: '/htmlGuide.html',
    icon: '🌐',
  },
  {
    id: 'asp-dev',
    title: 'מדריך ASP.NET',
    description: 'מדריך לפיתוח שרת עם ASP.NET - מהבסיס ועד ליישומים מתקדמים.',
    category: 'teaching',
    path: ['פיתוח ווב'],
    linkUrl: '/aspDev.html',
    icon: '⚙️',
  },
  {
    id: 'server-impl',
    title: 'מדריך Server Implementation',
    description: 'מדריך מקיף למימוש שרת - ארכיטקטורה, API ותקשורת.',
    category: 'teaching',
    path: ['פיתוח ווב'],
    linkUrl: '/serverImpl.html',
    icon: '🖥️',
  },
  {
    id: 'little-prince',
    title: 'הנסיך הקטן - אנטואן דה סנט-אכזופרי',
    description: 'ספר שמלווה אותי מגיל צעיר. כל קריאה מחדש חושפת שכבה חדשה של משמעות.',
    category: 'general',
    path: ['ספרים'],
    linkUrl: '',
    icon: '📚',
  },
  {
    id: 'favorite-quote',
    title: 'ציטוט שאני אוהבת',
    description: '"העולם מלא בדברים קטנים ומיוחדים, צריך רק לדעת איפה לחפש אותם."',
    category: 'general',
    path: ['השראה'],
    linkUrl: '',
    icon: '💡',
  },
  {
    id: 'numpy',
    title: 'numpy',
    description: '',
    category: 'teaching',
    path: ['מדעי הנתונים'],
    linkUrl: '/numpy.html',
    icon: '🧮',
  },
  {
    id: 'eda',
    title: 'EDA',
    description: 'וידאו הסבר',
    category: 'teaching',
    path: ['מדעי הנתונים', 'EDA'],
    linkUrl: 'eda_video.mp4',
    icon: '📖',
  }
] as any[]).map(normalizeMaterial)
