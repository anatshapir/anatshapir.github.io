import {
  BarChart3, Binary, BookOpen, Boxes, Braces, CaseSensitive, ClipboardCheck,
  Code2, Cpu, Database, Filter, GitBranch, Globe, Layers, Network, Regex,
  Repeat2, Search, SquareTerminal, Table2, Workflow, Wrench, type LucideIcon,
} from "lucide-react";

const symbols: Record<string, [LucideIcon, string]> = {
  "יסודות מדעי המחשב": [Code2, "#0085C8"],
  "מבני נתונים": [Network, "#AD7F0C"],
  "מדעי הנתונים": [BarChart3, "#EF882A"],
  "פיתוח ווב": [Globe, "#258B4A"],
  "מודלים חישוביים": [Cpu, "#6D338E"],
  "חשיבה רקורסיבית": [Repeat2, "#0085C8"],
  "עצים": [GitBranch, "#258B4A"],
  "מבחנים": [ClipboardCheck, "#6D338E"],
  "אלגוריתמיקה": [Workflow, "#EF882A"],
  "איך מחשבים ושפות תכנות עובדים": [Binary, "#0085C8"],
  "הכנת נתונים": [Filter, "#258B4A"],
  "חקירת נתונים (EDA)": [Search, "#EF882A"],
  "כלים": [Wrench, "#AD7F0C"],
  "כלים לעבודה עם נתונים": [Table2, "#0085C8"],
  "מבוא למדעי הנתונים": [Database, "#EF882A"],
  "מודלים": [Layers, "#6D338E"],
  "מכונות טיורינג": [SquareTerminal, "#0085C8"],
  "מערכים ומחרוזות": [CaseSensitive, "#258B4A"],
  "ניתוח קוד": [Braces, "#6D338E"],
  "עצמים": [Boxes, "#EF882A"],
  "שפות רגולריות": [Regex, "#6D338E"],
};

export default function TopicSymbol({ name }: { name: string }) {
  const [Icon, color] = symbols[name] ?? [BookOpen, "#EF882A"];
  return <Icon size={30} strokeWidth={1.8} color={color} aria-hidden="true" focusable="false" />;
}