# Annual Trip Management System
A full-stack web application for managing annual school trips, including student registration and location tracking.


SafeZone - מערכת מעקב ובקרה לטיולים שנתיים
המערכת מספקת איתור מקום בזמן אמת לטיולים
המערכת מזהה מיקומים גאוגרפיים של תלמידות לפי כל מורה
ומנתרת את התלמידות שחרגו מהטווח.

תכונות עיקריות:
 ניהול משתמשים: רישום והתחברות מאובטחת למורות באמצעות תעודת זהות spring security
 מעקב בזמן אמת: הצגת מפה בזמן אמת עם מיקומי המורה וכל תלמידות הכיתה
 חישוב מרחק חכם: שימוש בנוסחת ה"אברסין" לחישוב מרחק על פני כדור הארץ.
 התרעות ויזואליות: סימון תלמידות שחרגו מטווח של 3 ק"מ מהמורה בצבע אדום.
 ניהול כיתה: הוספת תלמידות חדשות וצפייה ברשימות תלמידות לפי כיתת המורה או הצגת תלמידות כלל בית הספר.

טכנולוגיות:
Backend (Java Spring Boot):
# Spring Security אבטחת ה-API והרשאות מבוססות תפקיד.
# REST API חשיפת נקודות קצה לתקשורת עם הצד לקוח. 
# Haversine Formula נוסחה לחישוב מרחקים גאוגרפיים.
Frontend /React:
# React Router  - ניווט בין דפי המערכת (Dashboard, Login, Register).
# Axios - לביצוע קריאות HTTP לשרת.
# Local Storage - שמירת מצב התחברות של המורה בדפדפן.
# ספריות -שימוש בספריות REACT LEAFLRT  ועוד...

מבנה הפרויקט:
Backend /Java :
# SecurityConfig הגדרות אבטחה, CORS, וסינון גישה לנתיבים.
# StudentController & TeacherController  - ניהול הבקשות הנכנסות עבור תלמידות ומורות.
# StudentService & TeacherService לוגיקה עסקית, עיבוד נתוני מיקום וחישובי מרחק.
# UserDetailsService בשימוש עם Spring Security לניהול הזדהות מורות.
Frontend /React:
# TeacherDashboard דף הבית המרכזי המשלב את : המפה, ניהול הכיתה והוספת תלמידות.
# MapPage רכיב המפה המבצע עדכוני מיקום אוטומטיים ומתעדכן מול השרת על חריגות מרחק.
# TeacherLogin / TeacherRegister  - דפי הזדהות ורישום למערכת.

הוראות הרצה:
צד שרת:
# יש להפעיל את פרויקט ה Spring Boot -השרת ירוץ כברירת מחדל על http://localhost:8080.
צד לקוח:
# יש להתקין את npm install  להרצת כל הספריות.
# יש להריץ בתרמינל  npm start להפעלת האפליקציה ב http://localhost:3000 

בונוס: 
חישוב מרחקים בוצע ע"י נוסחת האברסין -נוסחה המחשבת מרחק ע"פ כדור הארץ.

תמונות הפרוייקט:
![עמוד התחברות מורה](./src/assets/login_Demo.png)
![עמוד הרשמה מורה](./src/assets/register_Demo.png)
לוח מורה הכולל:
#הוספת תלמידה 
#הצגת רשימת תלמידות כלל בית הספר 
#הצגת התלמידות של כיתת המורה.
![לוח מורה](./src/assets/dashboard_Demo.png) 
![לוח מורה -מפה-מיקום תקין](./src/assets/dashboard_Demo1.png)


