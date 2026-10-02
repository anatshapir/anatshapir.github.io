// Run in the original website checkout: node script/check-resource-catalog.mjs .
// This checks the specifically reviewed resources, not arbitrary future additions.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const read = (path) => readFileSync(resolve(root, path));
const source = JSON.parse(read("public/materials.json"));
const published = JSON.parse(read("docs/materials.json"));
assert.deepEqual(published, source, "The served and source catalogs must agree");
const records = new Map(source.materials.map((item) => [item.id, item]));
assert.equal(records.size, source.materials.length, "IDs must stay unique");
const expected = [
  ["eda-video", "וידאו הסבר EDA", "/eda_video.mp4"],
  ["eda-מחברת", "מדדי ביצוע - מחברת", "https://colab.research.google.com/github/anatshapir/anatshapir.github.io/blob/main/docs/NB07_Evaluation_Metrics.ipynb"],
  ["java-exercise", "תרגול Java - מחשבון נקודות", "/javaExercise.html"],
  ["datascience-project", "מבוא ללמידת מכונה", "/datascience-project.html"],
  ["html-guide", "מדריך HTML ו-ASP.NET ב-Visual Studio", "/htmlGuide.html"],
  ["server-impl", "מדריך Server Implementation", "/serverImpl.html"],
  ["svm-percepton", "SVM & Perceptron", "https://colab.research.google.com/github/anatshapir/anatshapir.github.io/blob/main/docs/NB15_SVM_Perceptron.ipynb"],
  ["svm-מצגת-אינטרקטיבית", "SVM ו-Perceptron - מצגת PDF", "/From_Neurons_to_SVM.pdf"],
  ["הרצת-מודלים", "הכללת מודלים - מצגת PDF", "/Mastering_Model_Generalization.pdf"],
  ["בוחן-עצים", "בוחן עצים", "/binary_trees_quiz.html"],
];
for (const [id, title, url] of expected) {
  assert.ok(records.has(id), `Preserve the existing ID: ${id}`);
  assert.equal(records.get(id).title, title, `Reviewed title for ${id}`);
  assert.equal(records.get(id).linkUrl, url, `Reviewed destination for ${id}`);
}
assert.deepEqual(records.get("eda-מחברת").path, ["מדעי הנתונים", "מודלים", "מדדי ביצוע"]);
assert.deepEqual(records.get("datascience-project").path, ["מדעי הנתונים", "מבוא ללמידת מכונה"]);
assert.equal(records.get("numpy").linkUrl, "/numpy.html", "Keep NumPy separate from EDA video");
const digest = "6788dbf5b591cf10750cc43607ed0fb94716c991d8639744b24ba00804c66a3d";
for (const path of ["eda_video.mp4", "public/eda_video.mp4", "docs/eda_video.mp4"]) {
  const video = read(path);
  assert.equal(video.length, 38087130, `${path}: recovered video size, not a placeholder`);
  assert.equal(createHash("sha256").update(video).digest("hex"), digest, `${path}: verified original EDA video`);
}
const notebook = JSON.parse(read("docs/NB07_Evaluation_Metrics.ipynb"));
const markdown = notebook.cells.filter((cell) => cell.cell_type === "markdown")
  .map((cell) => Array.isArray(cell.source) ? cell.source.join("") : cell.source).join("\n");
for (const term of ["Evaluation Metrics", "Confusion Matrix", "Precision", "Recall", "F1"]) {
  assert.ok(markdown.includes(term), `Evaluation notebook must contain ${term}`);
}
for (const [path, term] of [
  ["docs/datascience-project.html", "מבוא ללמידת מכונה"],
  ["docs/htmlGuide.html", "Visual Studio"],
  ["docs/htmlGuide.html", "ASP.NET"],
  ["docs/javaExercise.html", "מחשבון נקודות"],
  ["docs/serverImpl.html", "ASP.NET"],
]) {
  assert.ok(read(path).toString("utf8").includes(term), `${path}: reviewed content marker ${term}`);
}
const fallback = read("src/data/materials.ts").toString("utf8");
for (const [id, title, url] of expected) {
  const start = fallback.indexOf(`id: '${id}'`);
  if (start < 0) continue; // The legacy fallback does not contain every catalog entry.
  const end = fallback.indexOf("\n  },", start);
  assert.ok(end > start, `Fallback record boundary for ${id}`);
  const block = fallback.slice(start, end);
  assert.ok(block.includes(`title: '${title}'`), `Fallback title for ${id}`);
  assert.ok(block.includes(`linkUrl: '${url}'`), `Fallback destination for ${id}`);
}
console.log(`Verified ${expected.length} corrected records, source/served agreement, notebook content, HTML markers and all 3 recovered video copies.`);