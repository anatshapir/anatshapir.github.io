# מדריך הוספת תכנים לאתר

## הוספת חומר למידה חדש

פתחו את הקובץ `study-materials.html` והוסיפו בלוק חדש לפני סוף ה-`</div>` של ה-container:

```html
<a href="YOUR_FILE.html" class="content-item" data-category="CATEGORY">
  <div class="content-item-icon">EMOJI</div>
  <div class="content-item-body">
    <h3>שם החומר</h3>
    <p>תיאור קצר של החומר.</p>
  </div>
  <span class="content-item-tag">שם הקטגוריה</span>
</a>
```

### קטגוריות זמינות:
- `recursion` - רקורסיה
- `data-science` - מדעי הנתונים
- `web` - פיתוח ווב
- `cs` - מדעי המחשב

### להוספת קטגוריה חדשה:
הוסיפו כפתור חדש בחלק של `filter-tags`:
```html
<button class="filter-tag" data-category="new-category">שם קטגוריה</button>
```

---

## הוספת דבר מעניין (המלצה)

פתחו את `interesting-things.html` והוסיפו:

```html
<div class="content-item" data-category="CATEGORY">
  <div class="content-item-icon">EMOJI</div>
  <div class="content-item-body">
    <h3>כותרת</h3>
    <p>תיאור או טקסט ההמלצה.</p>
  </div>
  <span class="content-item-tag">שם הקטגוריה</span>
</div>
```

### קטגוריות זמינות:
- `books` - ספרים
- `songs` - שירים
- `inspiration` - השראה
- `recommendations` - המלצות

---

## אימוג'ים מומלצים לאייקונים
- 📚 ספרים: `&#128218;`
- 🧠 חשיבה: `&#129504;`
- 📊 גרפים: `&#128202;`
- 🌳 עצים: `&#127795;`
- 🔑 מפתח: `&#128272;`
- 🔍 חיפוש: `&#128269;`
- 🌐 ווב: `&#127760;`
- ☕ ג'אווה: `&#9749;`
- 💡 רעיון: `&#128161;`
- 🎵 מוזיקה: `&#127925;`
- ⭐ כוכב: `&#11088;`
- 📖 ספר פתוח: `&#128214;`

---

## החלפת תמונות
- **אווטאר**: החליפו את `images/avatar.png` (מומלץ 100x100 פיקסלים, עגול)
- **איור ראשי**: החליפו את `images/illustration.png` (מומלץ 380x380 פיקסלים)

## שינוי כתובת אימייל
חפשו ב-HTML את `anat@example.com` והחליפו בכתובת האמיתית.
