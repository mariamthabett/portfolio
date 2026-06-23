/* =================================================================
   Bilingual (English / Arabic) support for the portfolio.
   - data-i18n="key"       -> sets element.textContent
   - data-i18n-html="key"  -> sets element.innerHTML (for rich text)
   Toggles <html lang/dir>, remembers choice in localStorage, and
   exposes window.__lang + a "langchange" event for other scripts.
   ================================================================= */
(function () {
  "use strict";

  const I18N = {
    en: {
      "meta.title": "Mariam Ahmed Thabet — Portfolio",

      "nav.about": "About",
      "nav.journey": "Journey",
      "nav.projects": "Projects",
      "nav.experience": "Experience",
      "nav.resume": "Resume",
      "nav.contact": "Contact",

      "hero.badge": "Available for opportunities",
      "hero.title1": "Mariam Ahmed",
      "hero.title2": "Thabet",
      "hero.altname": "مريم أحمد ثابت",
      "hero.headline":
        '<span class="hl">Computers &amp; Information Graduate</span> <span class="sep">•</span> ' +
        '<span class="hl hl--red">National Volleyball Athlete</span> <span class="sep">•</span> ' +
        '<span class="hl hl--gold">Tech &amp; Marketing Enthusiast</span>',
      "hero.cta.work": "View My Work",
      "hero.cta.cv": "View CV",
      "hero.scroll": "Scroll",
      "hero.badge1": "🏐 National Team",
      "hero.badge2": "💻 CS Graduate",

      "about.eyebrow": "01 — About",
      "about.title": 'Where technology meets <span class="grad-text">elite athletics</span>',
      "about.p1":
        "I'm a forward-thinking <strong>Information Systems &amp; Computer Science</strong> professional " +
        "who blends technology with business — from network administration and data management to " +
        "a strong foundation in <strong>AI and cybersecurity</strong>. I love designing innovative, " +
        "sustainable solutions that drive digital transformation and sharpen decision-making.",
      "about.p2":
        "Off the screen, I compete as a <strong>professional volleyball player</strong> for Al Ahly SC " +
        "and the Egyptian National Team. The same discipline, focus, and teamwork that power my game " +
        "shape how I build, learn, and lead in tech and marketing.",
      "about.stat1": "Years on the court",
      "about.stat2": "Trainings &amp; courses",
      "about.stat3": "Languages (AR / EN)",
      "about.stat4": "Dedication",

      "journey.eyebrow": "02 — Journey",
      "journey.title": 'A dual path: <span class="grad-text">academics &amp; the court</span>',
      "journey.sub": "Balancing a Computer Science degree with a professional athletic career.",
      "journey.edu.head": "Academic Life",
      "journey.edu1.date": "2020 — 2024",
      "journey.edu1.title": "Ain Shams University",
      "journey.edu1.org": "Faculty of Computer &amp; Information Science",
      "journey.edu1.desc":
        "Bachelor of Computer Science &amp; Information Technology — specialization in " +
        "<strong>Information Systems</strong>. GPA 2.543 / 4.",
      "journey.edu2.date": "Graduation Project · Grade B+",
      "journey.edu2.title": "Auction Application",
      "journey.edu2.org": "Java desktop application",
      "journey.edu2.desc":
        'A fully functional online auction system with live bidding and chat. ' +
        '<a href="#projects" class="inline-link">See the project ↓</a>',
      "journey.sport.head": "Athletic Life",
      "journey.sport1.date": "Professional Career",
      "journey.sport1.title": 'Al Ahly SC <span dir="rtl" lang="ar" class="ar">النادي الأهلي</span>',
      "journey.sport1.org": "Volleyball Player",
      "journey.sport1.desc":
        "Competing at the highest club level in Egypt with one of Africa's most decorated sports clubs.",
      "journey.sport2.date": "National Representation",
      "journey.sport2.title": 'Egypt National Team <span dir="rtl" lang="ar" class="ar">منتخب مصر</span>',
      "journey.sport2.org": "Volleyball Player",
      "journey.sport2.desc": "Proudly representing Egypt on the national stage.",
      "journey.cap1": "Graduation — Ain Shams University",
      "journey.cap2": "League match action",

      "proj.eyebrow": "03 — Projects",
      "proj.title": 'Featured <span class="grad-text">work</span>',
      "proj.tag2": "Desktop App",
      "proj.tag3": "Graduation Project",
      "proj.tag4": "Grade B+",
      "proj.title2": "Auction Application",
      "proj.desc":
        "A fully functional online auction platform where users browse products, place live bids, " +
        "and chat in real time. Built end-to-end in <strong>Java</strong> as my graduation project.",
      "proj.features.head": "Key Features",
      "proj.f1": "User registration &amp; authentication",
      "proj.f2": "Browse &amp; search product listings",
      "proj.f3": "Real-time bidding with live price updates",
      "proj.f4": "Integrated live chat between users",
      "proj.f5": "Bid history &amp; auction status tracking",
      "proj.arch.head": "Architecture",
      "proj.a1": "Java client application (Swing UI)",
      "proj.a2": "Layered design: UI · logic · data",
      "proj.a3": "Database-backed persistence",
      "proj.a4": "Event-driven bid &amp; chat updates",
      "proj.source": "Source (add link)",
      "proj.cap.home": "Home",
      "proj.cap.products": "Products",
      "proj.cap.chat": "Live Chat",

      "exp.eyebrow": "04 — Experience &amp; Training",
      "exp.title": 'Professional <span class="grad-text">growth</span>',
      "exp.now": "Current",
      "exp.c1.meta": "Professional role · ongoing",
      "exp.c1.desc":
        "Currently growing my career at <strong>Evolve</strong> while sharpening my edge with a " +
        "professional <strong>Digital Marketing</strong> course — pairing technical depth with " +
        "modern marketing skills.",
      "exp.chip1": "Digital Marketing Course",
      "exp.chip2": "Continuous Learning",
      "exp.c2.role": "Sales — Ready Call",
      "exp.c2.meta": "Startup · Saudi Arabia 🇸🇦",
      "exp.c2.desc":
        "Worked in sales for <strong>Ready Call</strong>, a Saudi-based startup — building client " +
        "relationships and communication skills in a fast-paced startup environment.",
      "exp.c3.role": "Cyber Security Training",
      "exp.c3.meta": "Security fundamentals &amp; ethical hacking",
      "exp.c3.desc":
        "Completed hands-on cyber security training — including an " +
        "<strong>Android App Hacking — Black Belt</strong> course — building practical skills " +
        "in security protocols and threat analysis.",
      "exp.badges.head": "Trainings &amp; Certifications",
      "exp.badge1": "🛡️ Cyber Security",
      "exp.badge2": "🥋 Android App Hacking — Black Belt",
      "exp.badge3": "📱 Android Development <em>2021</em>",
      "exp.badge4": "🧪 Software Testing <em>2020</em>",
      "exp.badge5": "📈 Digital Marketing",
      "exp.skills.head": "Technical Skills",
      "skill.problem": "Problem Solving",
      "skill.data": "Data Management",
      "exp.core.head": "Core Strengths",
      "skill.comm": "Communication",
      "skill.lead": "Leadership",
      "skill.team": "Teamwork",
      "skill.creativity": "Creativity",
      "skill.org": "Organization",
      "exp.lang.head": "Languages",
      "lang.ar": "Arabic",
      "lang.ar.level": "Native",
      "lang.en": "English",
      "lang.en.level": "Fluent",
      "exp.activity.head": "Student Activity",
      "exp.activity.text":
        "<strong>ApplAi (2022)</strong> — Public Relations. Built strategic relationships with " +
        "partners &amp; sponsors and ran multi-channel PR campaigns that boosted student engagement.",

      "resume.eyebrow": "05 — Resume",
      "resume.title": 'My <span class="grad-text">CV</span>',
      "resume.doc.role": "Information Systems · Computer Science",
      "resume.cta.head": "Get the full picture",
      "resume.cta.text":
        "A clean, one-page CV — education, technical skills, trainings, experience, languages, " +
        "and activities, all at a glance. Opens in a new tab; use <strong>Print → Save as " +
        "PDF</strong> to download it.",
      "resume.cta.btn": "View / Download CV",
      "resume.cta.pdf": "or download the original PDF ↓",

      "contact.eyebrow": "06 — Contact",
      "contact.title": 'Let\'s <span class="grad-text">connect</span>',
      "contact.sub": "Open to opportunities in tech, marketing, and beyond.",
      "contact.email.label": "Email",
      "contact.phone.label": "Phone",
      "contact.loc.label": "Location",
      "contact.loc.value": "Cairo, Egypt",
      "form.name": "Your name",
      "form.email": "Your email",
      "form.message": "Message",
      "form.send": "Send Message",

      "footer.copy": "Mariam Ahmed Thabet. Crafted with care.",
    },

    ar: {
      "meta.title": "مريم أحمد ثابت — المعرض الشخصي",

      "nav.about": "نبذة",
      "nav.journey": "المسيرة",
      "nav.projects": "المشاريع",
      "nav.experience": "الخبرات",
      "nav.resume": "السيرة الذاتية",
      "nav.contact": "تواصل",

      "hero.badge": "متاحة للفرص",
      "hero.title1": "مريم أحمد",
      "hero.title2": "ثابت",
      "hero.altname": "Mariam Ahmed Thabet",
      "hero.headline":
        '<span class="hl">خريجة حاسبات ومعلومات</span> <span class="sep">•</span> ' +
        '<span class="hl hl--red">لاعبة كرة طائرة بالمنتخب الوطني</span> <span class="sep">•</span> ' +
        '<span class="hl hl--gold">شغوفة بالتقنية والتسويق</span>',
      "hero.cta.work": "استعرض أعمالي",
      "hero.cta.cv": "عرض السيرة الذاتية",
      "hero.scroll": "مرّر",
      "hero.badge1": "🏐 المنتخب الوطني",
      "hero.badge2": "💻 خريجة حاسبات",

      "about.eyebrow": "٠١ — نبذة",
      "about.title": 'حيث تلتقي التقنية <span class="grad-text">بالاحتراف الرياضي</span>',
      "about.p1":
        "أنا متخصصة طموحة في <strong>نظم المعلومات وعلوم الحاسب</strong>، أمزج بين التقنية والأعمال — " +
        "من إدارة الشبكات وإدارة البيانات إلى أساسٍ قوي في <strong>الذكاء الاصطناعي والأمن السيبراني</strong>. " +
        "أحب تصميم حلول مبتكرة ومستدامة تدفع التحوّل الرقمي وتُحسّن صناعة القرار.",
      "about.p2":
        "وبعيدًا عن الشاشة، ألعب كرة الطائرة باحتراف مع <strong>النادي الأهلي</strong> والمنتخب المصري. " +
        "ونفس الانضباط والتركيز والعمل الجماعي الذي يقود لعبي يشكّل طريقتي في البناء والتعلّم والقيادة في التقنية والتسويق.",
      "about.stat1": "سنوات في الملعب",
      "about.stat2": "تدريبات ودورات",
      "about.stat3": "اللغات (عربي/إنجليزي)",
      "about.stat4": "إخلاص والتزام",

      "journey.eyebrow": "٠٢ — المسيرة",
      "journey.title": 'مسارٌ مزدوج: <span class="grad-text">الدراسة والملعب</span>',
      "journey.sub": "موازنة بين دراسة علوم الحاسب ومسيرة رياضية احترافية.",
      "journey.edu.head": "الحياة الأكاديمية",
      "journey.edu1.date": "٢٠٢٠ — ٢٠٢٤",
      "journey.edu1.title": "جامعة عين شمس",
      "journey.edu1.org": "كلية الحاسبات والمعلومات",
      "journey.edu1.desc":
        "بكالوريوس علوم الحاسب وتقنية المعلومات — تخصّص <strong>نظم المعلومات</strong>. المعدل التراكمي ٢٫٥٤٣ / ٤.",
      "journey.edu2.date": "مشروع التخرّج · تقدير B+",
      "journey.edu2.title": "تطبيق المزادات",
      "journey.edu2.org": "تطبيق سطح مكتب بلغة Java",
      "journey.edu2.desc":
        'نظام مزادات إلكتروني متكامل مع مزايدة ودردشة مباشرة. ' +
        '<a href="#projects" class="inline-link">شاهد المشروع ↓</a>',
      "journey.sport.head": "الحياة الرياضية",
      "journey.sport1.date": "مسيرة احترافية",
      "journey.sport1.title": "النادي الأهلي",
      "journey.sport1.org": "لاعبة كرة طائرة",
      "journey.sport1.desc":
        "أنافس على أعلى مستوى للأندية في مصر مع أحد أعرق الأندية الرياضية في إفريقيا.",
      "journey.sport2.date": "تمثيل وطني",
      "journey.sport2.title": "منتخب مصر",
      "journey.sport2.org": "لاعبة كرة طائرة",
      "journey.sport2.desc": "أُمثّل مصر بكل فخر على المستوى الوطني.",
      "journey.cap1": "التخرّج — جامعة عين شمس",
      "journey.cap2": "من إحدى مباريات الدوري",

      "proj.eyebrow": "٠٣ — المشاريع",
      "proj.title": 'أبرز <span class="grad-text">الأعمال</span>',
      "proj.tag2": "تطبيق سطح مكتب",
      "proj.tag3": "مشروع التخرّج",
      "proj.tag4": "تقدير B+",
      "proj.title2": "تطبيق المزادات",
      "proj.desc":
        "منصة مزادات إلكترونية متكاملة يتصفّح فيها المستخدمون المنتجات ويقدّمون مزايدات حيّة ويتحادثون لحظيًا. " +
        "طُوّرت بالكامل بلغة <strong>Java</strong> كمشروع تخرّج.",
      "proj.features.head": "أهم المميزات",
      "proj.f1": "تسجيل المستخدمين والمصادقة",
      "proj.f2": "تصفّح المنتجات والبحث فيها",
      "proj.f3": "مزايدة لحظية مع تحديث الأسعار مباشرة",
      "proj.f4": "دردشة مباشرة مدمجة بين المستخدمين",
      "proj.f5": "سجل المزايدات وتتبّع حالة المزاد",
      "proj.arch.head": "البنية التقنية",
      "proj.a1": "تطبيق عميل بلغة Java (واجهة Swing)",
      "proj.a2": "تصميم طبقي: الواجهة · المنطق · البيانات",
      "proj.a3": "تخزين دائم عبر قاعدة بيانات",
      "proj.a4": "تحديثات مزايدة ودردشة مدفوعة بالأحداث",
      "proj.source": "الكود المصدري (أضف الرابط)",
      "proj.cap.home": "الرئيسية",
      "proj.cap.products": "المنتجات",
      "proj.cap.chat": "الدردشة المباشرة",

      "exp.eyebrow": "٠٤ — الخبرات والتدريب",
      "exp.title": 'النموّ <span class="grad-text">المهني</span>',
      "exp.now": "حالياً",
      "exp.c1.meta": "دور مهني · مستمر",
      "exp.c1.desc":
        "أطوّر مسيرتي حاليًا في <strong>Evolve</strong> مع صقل مهاراتي عبر دورة احترافية في " +
        "<strong>التسويق الرقمي</strong> — بدمج العمق التقني بمهارات التسويق الحديثة.",
      "exp.chip1": "دورة تسويق رقمي",
      "exp.chip2": "تعلّم مستمر",
      "exp.c2.role": "مبيعات — Ready Call",
      "exp.c2.meta": "شركة ناشئة · السعودية 🇸🇦",
      "exp.c2.desc":
        "عملتُ في المبيعات لدى <strong>Ready Call</strong>، وهي شركة ناشئة سعودية — لبناء علاقات العملاء " +
        "وتطوير مهارات التواصل في بيئة سريعة الإيقاع.",
      "exp.c3.role": "تدريب أمن سيبراني",
      "exp.c3.meta": "أساسيات الأمن والاختراق الأخلاقي",
      "exp.c3.desc":
        "أتممتُ تدريبًا عمليًا في الأمن السيبراني — يشمل دورة " +
        "<strong>اختراق تطبيقات أندرويد — الحزام الأسود</strong> — لبناء مهارات عملية في بروتوكولات " +
        "الأمان وتحليل التهديدات.",
      "exp.badges.head": "التدريبات والشهادات",
      "exp.badge1": "🛡️ أمن سيبراني",
      "exp.badge2": "🥋 اختراق تطبيقات أندرويد — الحزام الأسود",
      "exp.badge3": "📱 تطوير أندرويد <em>2021</em>",
      "exp.badge4": "🧪 اختبار البرمجيات <em>2020</em>",
      "exp.badge5": "📈 تسويق رقمي",
      "exp.skills.head": "المهارات التقنية",
      "skill.problem": "حل المشكلات",
      "skill.data": "إدارة البيانات",
      "exp.core.head": "نقاط القوة",
      "skill.comm": "التواصل",
      "skill.lead": "القيادة",
      "skill.team": "العمل الجماعي",
      "skill.creativity": "الإبداع",
      "skill.org": "التنظيم",
      "exp.lang.head": "اللغات",
      "lang.ar": "العربية",
      "lang.ar.level": "اللغة الأم",
      "lang.en": "الإنجليزية",
      "lang.en.level": "بطلاقة",
      "exp.activity.head": "النشاط الطلابي",
      "exp.activity.text":
        "<strong>ApplAi (2022)</strong> — علاقات عامة. بنيتُ علاقات استراتيجية مع الشركاء والرعاة " +
        "وأطلقتُ حملات علاقات عامة متعددة القنوات عزّزت تفاعل الطلاب.",

      "resume.eyebrow": "٠٥ — السيرة الذاتية",
      "resume.title": 'سيرتي <span class="grad-text">الذاتية</span>',
      "resume.doc.role": "نظم المعلومات · علوم الحاسب",
      "resume.cta.head": "الصورة الكاملة",
      "resume.cta.text":
        "سيرة ذاتية أنيقة من صفحة واحدة — التعليم والمهارات التقنية والتدريبات والخبرات واللغات والأنشطة في لمحة. " +
        "تُفتح في تبويب جديد؛ استخدمي <strong>طباعة → حفظ كـ PDF</strong> لتنزيلها.",
      "resume.cta.btn": "عرض / تحميل السيرة الذاتية",
      "resume.cta.pdf": "أو حمّل ملف PDF الأصلي ↓",

      "contact.eyebrow": "٠٦ — تواصل",
      "contact.title": 'لنبقَ <span class="grad-text">على تواصل</span>',
      "contact.sub": "منفتحة على الفرص في مجالات التقنية والتسويق وغيرها.",
      "contact.email.label": "البريد الإلكتروني",
      "contact.phone.label": "الهاتف",
      "contact.loc.label": "الموقع",
      "contact.loc.value": "القاهرة، مصر",
      "form.name": "اسمك",
      "form.email": "بريدك الإلكتروني",
      "form.message": "رسالتك",
      "form.send": "إرسال الرسالة",

      "footer.copy": "مريم أحمد ثابت. صُمم بعناية.",
    },
  };

  function apply(lang) {
    const dict = I18N[lang] || I18N.en;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v; // values may contain entities; safe (authored content)
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = dict[el.getAttribute("data-i18n-html")];
      if (v != null) el.innerHTML = v;
    });

    if (dict["meta.title"]) document.title = dict["meta.title"];

    const label = document.getElementById("langToggleLabel");
    if (label) label.textContent = lang === "ar" ? "English" : "العربية";

    const btn = document.getElementById("langToggle");
    if (btn) btn.setAttribute("aria-label", lang === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic");

    window.__lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  function init() {
    let lang = "en";
    try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
    if (lang !== "en" && lang !== "ar") lang = "en";
    apply(lang);

    const btn = document.getElementById("langToggle");
    if (btn) {
      btn.addEventListener("click", () => apply(window.__lang === "ar" ? "en" : "ar"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
