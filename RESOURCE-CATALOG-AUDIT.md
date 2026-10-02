# Learning-resource semantic audit

Audit date: 2026-10-02. Target: `anatshapir/anatshapir.github.io`, not a second local catalog.

## Source and publishing boundary

The published `https://anatshapir.github.io/materials.json`, `main:public/materials.json`
and `main:docs/materials.json` agreed at audit time: 38 records, including 36 linked
learning resources and two linkless personal records. Pages serves `main:/docs`.
The prepared correction updates both catalogs and the affected legacy fallback
records. All IDs, ordering, unrelated records and metadata are preserved.

The connected UI (`client/src/lib/content-catalog.ts`,
`client/src/pages/teaching-materials.tsx`) remains authoritative-feed driven.
There are no ID-specific runtime overrides, invented resources or new download
buttons. A GitHub pull request is the delivery boundary; these corrections are
**not live until approved and published**.

## EDA video recovery: verified content, not a filename guess

The mislabeled video entry opened `/numpy.html`, whose title and body teach
NumPy arrays. The current root `eda_video.mp4` is two bytes.

Repository history establishes that commit
`d66cd0683391d856202857542bf00f0eb105b4f3` deleted
`חקר_נתונים_(EDA)__המדריך_לבלש.mp4` and added the empty replacement.
The original was recovered from its parent
`89e8a58c3edf52fcf960a03ea20bff50a0326887`.

- Original Git blob: `526df34a94dcf0f7023eb2f572a3a93b4e7ee6f7`.
- Size: 38,087,130 bytes.
- SHA-256: `6788dbf5b591cf10750cc43607ed0fb94716c991d8639744b24ba00804c66a3d`.
- `ffprobe`: 562.573061 seconds, 1280×720 H.264 video plus AAC audio.
- Full `ffmpeg` decode completed without errors.
- Inspected frames at 5, 90 and 210 seconds: “חקר נתונים (EDA): המדריך לבלש”,
  mean versus median, and box-plot anatomy/outliers.

The pull request reuses this existing Git blob at `eda_video.mp4`,
`public/eda_video.mp4` (future builds), and `docs/eda_video.mp4` (current Pages
root). Only after recovering and inspecting it was the catalog URL changed to
`/eda_video.mp4`.

## Corrections

| Stable ID | Evidence and correction |
|---|---|
| `eda-video` | NumPy HTML is not an EDA video. Link to the recovered, verified video above. |
| `eda-מחברת` | Actual notebook Markdown titles it “מדדי ביצוע / Evaluation Metrics”; teaches Accuracy, Confusion Matrix, Precision, Recall and F1. Keep the existing resource and ID; rename to “מדדי ביצוע - מחברת”, describe it accurately, and classify under models/evaluation metrics. No verified EDA notebook was present in the main tree; do not manufacture a replacement. |
| `java-exercise` | Document title and staged exercises describe a points-calculator Java exercise, not a general solver. Use “תרגול Java - מחשבון נקודות” and a scoped description. |
| `datascience-project` | Title, H1 and body teach introduction to machine learning, learning types, workflow, overfitting/underfitting. Rename/reclassify accordingly. |
| `html-guide` | H1 and installation instructions use ASP.NET and Visual Studio, followed by HTML lessons. Not VS Code. Correct title and description. |
| `server-impl` | Body is a practical ASP.NET project guide with database extensions, visitor counter, survey and admin page. Replace the unsupported generic API/architecture description. |
| `svm-percepton` | Notebook Markdown says SVM and Perceptron. Correct spelling in title; preserve ID/link. |
| `svm-מצגת-אינטרקטיבית` | Visually inspected PDF cover and page 8 cover linear classifiers, Perceptron and SVM. It is a static image-slide PDF, not an interactive presentation. Label explicitly as PDF. |
| `הרצת-מודלים` | Visually inspected cover says “המרוץ להכללה”; page 7 teaches data leakage and Train/Validation/Test splits. Use “הכללת מודלים - מצגת PDF” with matching description. |
| `בוחן-עצים` | Actual page is a Java binary-tree quiz. Canonicalize the source URL to `/binary_trees_quiz.html`; eliminate the erroneous trailing slash rather than relying only on the new UI's normalization. |

## Other linked resources inspected

HTML titles/headings and relevant body content were fetched from the published
destinations, not inferred from filenames. Colab notebook contents were fetched
from the exact linked GitHub `main/docs` files. The four image-only PDFs were
rendered with PyMuPDF: covers and selected interior pages were inspected visually
because their text extraction is empty. Video frames were inspected directly.

| ID | Content evidence / result |
|---|---|
| `recursive-thinking` | Recursive problem-solving guide, base cases and recursive steps; matches. |
| `recursion-visualization` | Recursive execution/debugger visualization; matches. |
| `bintree-recursion` | Binary-tree recursion visualization; matches. |
| `recursion-escape-advanced` | Hard/extreme recursion puzzles and code challenges; matches. |
| `recursion-escape` | Recursive labyrinth with base-case and recursion rooms; matches. |
| `bfs-dfs` | Iterative DFS with stack and BFS with queue; matches. |
| `regular-languages` | Regular-language/automata exercises in computational-models practice; matches. |
| `track-table` | Trace-table explanation and fill-in practice; matches. |
| `eda` | EDA, statistics, single/multivariate plots, correlation and preparation; matches. |
| `pandas` | DataFrames, groupby and data cleaning; matches. |
| `asp-dev` | SQL/database/backend guide explicitly contains ASP.NET server-development section; matches. |
| `numpy` | Arrays, array operations, indexing/slicing and statistics; matches. |
| `eda-pdf` | Rendered cover says practical EDA guide; page 8 teaches scatter plots, relationships and outliers; matches. |
| `איך-נוצרו-שפות-התכנות` | Rendered cover says programming-language evolution/abstraction ladder; page 8 explains the assembler and historical transition; matches. |
| `שפת-מכונה-לשפות-תכנות` | Video opening says “שפת סף: לדבר עם המכונה”; frame at 180 seconds covers machine language and abstraction. Consistent with the broad source label. |
| `numpy-מחברת` | Markdown and exercises cover NumPy arrays, indexing, broadcasting, reshape and statistics; matches. |
| `pandas-מחברת` | Markdown teaches DataFrames, loading, selection/filtering, missing values and groupby; matches. |
| `knn` | Notebook teaches KNN, distances, K selection, scaling and evaluation; matches. |
| `knn-מצגת` | KNN HTML presentation, normalization and worked fruit-classification example; matches. |
| `data-preparation` | Notebook teaches Cut/Qcut, feature engineering, scaling and feature selection; matches. |
| `svm` | HTML presentation covers SVM and Perceptron, margins and neural networks; matches. |
| `turing-machine-simulator` | State machine, tape simulator and test cases; matches. |
| `מבחן-יסודות` | Algorithmics exam; introduction and timer state 30 minutes, 14 questions; matches catalog. |
| `מבחן-יסודות-חלק-2-מערכים-ומחרוזות` | Arrays/strings exam; introduction and timer state 30 minutes, 13 questions; matches. |
| `מבחן-יסודות-חלק-3-עצמים` | Objects/classes exam; introduction and timer state 60 minutes, 26 questions; matches. |
| `מבחן-יסודות-חלק-4-ניתוח-קוד` | Code-analysis exam; introduction and timer state 60 minutes, 26 questions; matches. |

The ten corrected rows plus these 26 rows cover all 36 linked learning
resources. This is a semantic catalog audit, not an exhaustive test of each
resource's exercises, algorithms or answer grading.

## Verification

- `node script/check-resource-catalog.mjs .` in the prepared original-site
  checkout checks catalog agreement, reviewed IDs/titles/URLs, notebook/HTML
  markers and the digest of all three restored video copies.
- `tests/browser/reviewed-resources.spec.ts` verifies corrected feed records
  reach cards and detail pages, that EDA filtering excludes the evaluation
  notebook, and that the UI follows a later source update without hardcoded
  corrections. Its fixture is test-only.
- Re-fetch the published catalog and video after the pull request is approved
  and the site's existing publishing process completes. Until then the public
  feed still contains the old labels/links.