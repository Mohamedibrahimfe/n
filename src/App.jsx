import { useState } from "react";
import { isSupabaseConfigured, supabase } from "./lib/supabase.js";

const skills = [
  {
    name: "Speaking",
    title: "تحدّث بثقة",
    description: "نظّم إجاباتك، وعبّر عن أفكارك بوضوح في كل جزء من الاختبار.",
    icon: "mic",
  },
  {
    name: "Writing",
    title: "اكتب بإتقان",
    description: "ابنِ إجابات قوية وافهم المعايير التي يقيّمك الاختبار على أساسها.",
    icon: "writing",
  },
  {
    name: "Listening",
    title: "استمع بتركيز",
    description: "تعرّف على أنواع الأسئلة وتدرّب على الوصول إلى الإجابة بثقة.",
    icon: "headphones",
  },
  {
    name: "Reading",
    title: "اقرأ بذكاء",
    description: "طوّر سرعتك وتعلّم استراتيجيات التعامل مع النصوص والأسئلة.",
    icon: "reading",
  },
];

const benefits = [
  "خطة تدريب واضحة تمشي عليها خطوة بخطوة",
  "استراتيجيات عملية لكل مهارة",
  "تدريبات تحاكي طبيعة أسئلة الاختبار",
  "تركيز على الأخطاء التي تؤثر فعلًا في درجتك",
  "تدريب يساعدك على إدارة وقتك داخل الاختبار",
];

const audience = [
  "تستعد لاختبار IELTS للمرة الأولى",
  "تريد رفع درجتك الحالية",
  "تحتاج الاختبار للدراسة أو العمل أو الهجرة",
  "لا تعرف من أين تبدأ استعدادك",
];

function Icon({ name, size = 22 }) {
  const shared = {
    "aria-hidden": true,
    fill: "none",
    height: size,
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
    width: size,
  };

  const drawings = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    headphones: (
      <>
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <path d="M5 14h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Zm14 0h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    mic: (
      <>
        <rect height="12" rx="6" width="8" x="8" y="2" />
        <path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8" />
      </>
    ),
    reading: (
      <>
        <path d="M12 7v14m0-14C9 5 5.5 4 3 5v14c2.5-1 6-.5 9 2m0-14c3-2 6.5-3 9-2v14c-2.5-1-6-.5-9 2" />
      </>
    ),
    writing: (
      <>
        <path d="m4 16-.8 4.8L8 20l11.4-11.4a2.1 2.1 0 0 0-3-3L5 17" />
        <path d="m14.8 6.2 3 3" />
      </>
    ),
  };

  return <svg {...shared}>{drawings[name] ?? drawings.check}</svg>;
}

function BrandMark() {
  return (
    <a aria-label="مسارك، الصفحة الرئيسية" className="brand" href="#home">
      <span aria-hidden="true" className="brand-mark">
        <svg fill="none" viewBox="0 0 28 28">
          <path
            d="M5 20.5 12.1 6h3.7L23 20.5h-4l-1.5-3.3h-6.7l-1.6 3.3H5Zm7.1-6.3h3.8L14 10.1l-1.9 4.1Z"
            fill="currentColor"
          />
          <circle cx="21.5" cy="6.5" fill="#CC5C00" r="2.5" />
        </svg>
      </span>
      <span>مسارك</span>
    </a>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-artwork" role="img" aria-label="لوحة تعليمية تعرض مهارات IELTS وخطة التقدم">
      <div aria-hidden="true" className="art-orbit orbit-one" />
      <div aria-hidden="true" className="art-orbit orbit-two" />
      <div className="score-card">
        <span className="score-kicker">مؤشر تقدّمك</span>
        <div aria-label="أربع مهارات أساسية في البرنامج" className="score-ring">
          <span className="score-value">4</span>
          <span className="score-label">مهارات أساسية</span>
        </div>
        <div className="score-rule" />
        <span className="score-note">كل خطوة تقرّبك من هدفك</span>
      </div>
      <div className="art-tag tag-top">
        <span aria-hidden="true" className="tag-dot" />
        <span>تدريب منظّم</span>
      </div>
      <div className="art-tag tag-bottom">
        <span className="tag-score">4</span>
        <span>مهارات. خطة واحدة.</span>
      </div>
      <span aria-hidden="true" className="art-star star-one">✳</span>
      <span aria-hidden="true" className="art-star star-two">✳</span>
    </div>
  );
}

function SectionHeading({ id, eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading-light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function RegistrationForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState({ kind: "idle", message: "" });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ kind: "idle", message: "" });

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        kind: "error",
        message: "تعذّر إرسال الطلب لأن إعدادات الاتصال غير مكتملة. يرجى المحاولة لاحقًا.",
      });
      return;
    }

    setStatus({ kind: "loading", message: "" });

    const { error } = await supabase.from("inquiries").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      course_interest: "IELTS",
    });

    if (error) {
      console.error("Unable to submit the IELTS inquiry:", error);
      setStatus({
        kind: "error",
        message: "لم نتمكّن من إرسال طلبك الآن. تحقّق من اتصالك بالإنترنت وحاول مرة أخرى.",
      });
      return;
    }

    setForm({ name: "", email: "", phone: "" });
    setStatus({
      kind: "success",
      message: "وصلنا طلبك بنجاح. سنتواصل معك قريبًا لإكمال تسجيلك.",
    });
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <label htmlFor="student-name">الاسم الكامل</label>
      <input
        autoComplete="name"
        id="student-name"
        name="name"
        onChange={updateField}
        placeholder="اكتب اسمك هنا"
        required
        value={form.name}
      />

      <label htmlFor="student-email">البريد الإلكتروني</label>
      <input
        autoComplete="email"
        dir="ltr"
        id="student-email"
        name="email"
        onChange={updateField}
        placeholder="name@example.com"
        required
        type="email"
        value={form.email}
      />

      <label htmlFor="student-phone">
        رقم الجوال <span className="optional-label">(اختياري)</span>
      </label>
      <input
        autoComplete="tel"
        dir="ltr"
        id="student-phone"
        name="phone"
        onChange={updateField}
        placeholder="+966 5X XXX XXXX"
        type="tel"
        value={form.phone}
      />

      <button className="button button-primary submit-button" disabled={status.kind === "loading"} type="submit">
        {status.kind === "loading" ? "جارٍ إرسال طلبك..." : "سجّل في برنامج IELTS"}
        {status.kind !== "loading" ? <Icon name="arrow" size={18} /> : null}
      </button>

      {status.message ? (
        <p
          aria-live="polite"
          className={`form-status form-status-${status.kind}`}
          role={status.kind === "error" ? "alert" : "status"}
        >
          {status.message}
        </p>
      ) : null}

      <p className="form-note">بياناتك بأمان، وسنستخدمها للتواصل بشأن البرنامج فقط.</p>
    </form>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <div className="topbar-inner">
            <BrandMark />
            <a className="topbar-note" href="#skills">خطوتك القادمة تبدأ هنا</a>
            <a className="topbar-link" href="#register">سجّل الآن</a>
          </div>
        </div>
        <div className="subnav">
          <div className="subnav-inner">
            <a className="course-name" href="#home">IELTS <span>التحضير للاختبار</span></a>
            <button
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={21} />
            </button>
            <nav aria-label="التنقل الرئيسي" className={`nav-links${menuOpen ? " nav-links-open" : ""}`} id="primary-navigation">
              <a href="#skills" onClick={closeMenu}>المهارات</a>
              <a href="#program" onClick={closeMenu}>عن البرنامج</a>
              <a href="#who" onClick={closeMenu}>لمن يناسب؟</a>
              <a className="nav-cta" href="#register" onClick={closeMenu}>احجز مقعدك</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero section-light" id="home">
          <div className="hero-inner content-width">
            <div className="hero-copy">
              <span className="hero-kicker"><span aria-hidden="true" className="kicker-line" /> رحلتك نحو IELTS تبدأ بخطة</span>
              <h1 id="hero-title">ارفع درجتك في <span>IELTS</span> <span className="title-nowrap">بثقة</span></h1>
              <p className="hero-lead">
                برنامج عملي يساعدك على الاستعداد للاختبار وتطوير مهاراتك في وقت أقل.
              </p>
              <p className="hero-description">
                تعلّم كيف تتعامل مع أسئلة IELTS، وطوّر مهارات الاستماع والقراءة والكتابة والمحادثة
                من خلال تدريب منظّم واستراتيجيات عملية.
              </p>
              <div className="hero-actions">
                <a className="button button-primary button-large" href="#register">
                  ابدأ استعدادك الآن <Icon name="arrow" size={18} />
                </a>
                <a className="text-link" href="#skills">اكتشف البرنامج</a>
              </div>
              <div className="hero-footnote">
                <span aria-hidden="true" className="footnote-mark"><Icon name="check" size={15} /></span>
                <span>استعداد منظّم. تدريب عملي. خطوة أوضح نحو هدفك.</span>
              </div>
            </div>
            <HeroArtwork />
          </div>
          <a aria-label="انتقل إلى المهارات التي ستتعلمها" className="scroll-cue" href="#skills">
            <span />
          </a>
        </section>

        <section aria-labelledby="skills-title" className="skills-section section-parchment" id="skills">
          <div className="content-width section-content">
            <SectionHeading
              description="أربع مهارات، واستعداد متكامل لكل جزء من اختبار IELTS."
              eyebrow="ماذا ستتعلّم؟"
              id="skills-title"
              title="مهاراتك. خطوة بخطوة."
            />
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <article className="skill-card" key={skill.name}>
                  <div className="skill-card-top">
                    <span aria-hidden="true" className={`skill-icon skill-icon-${skill.icon}`}>
                      <Icon name={skill.icon} size={23} />
                    </span>
                    <span className="skill-number">0{index + 1}</span>
                  </div>
                  <span className="skill-name" dir="ltr">{skill.name}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="program-title" className="program-section section-dark" id="program">
          <div className="program-inner content-width">
            <div className="program-copy">
              <span className="eyebrow">لماذا هذا البرنامج؟</span>
              <h2 id="program-title">استعد بذكاء،<br />مو بمجهود عشوائي.</h2>
              <p>
                كل تدريب له هدف. وكل استراتيجية تساعدك تعرف كيف تتعامل مع السؤال، وأين تركّز وقتك.
              </p>
              <a className="button button-light" href="#register">
                تعرّف على البرنامج <Icon name="arrow" size={18} />
              </a>
            </div>
            <ul className="benefit-list">
              {benefits.map((benefit, index) => (
                <li key={benefit}>
                  <span aria-hidden="true" className="benefit-number">0{index + 1}</span>
                  <span>{benefit}</span>
                  <Icon name="check" size={19} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="audience-title" className="audience-section section-light" id="who">
          <div className="audience-inner content-width">
            <div className="audience-intro">
              <span className="eyebrow">هل هذا البرنامج لك؟</span>
              <h2 id="audience-title">ابدأ من مكانك.<br /><span>وتقدّم لهدفك.</span></h2>
            </div>
            <div className="audience-content">
              <p>البرنامج مناسب لك إذا كنت:</p>
              <ul>
                {audience.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true"><Icon name="check" size={17} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="register-title" className="register-section section-parchment" id="register">
          <div className="register-inner content-width">
            <div className="register-copy">
              <span className="eyebrow">خطوتك تبدأ اليوم</span>
              <h2 id="register-title">لا تترك درجتك للصدفة.</h2>
              <p>
                استعد بطريقة منظمة، وتدرّب على ما تحتاجه فعلًا للاختبار. سجّل اهتمامك وسنتواصل معك بالتفاصيل.
              </p>
              <div className="register-assurance">
                <span aria-hidden="true" className="assurance-mark"><Icon name="check" size={17} /></span>
                <span>طلبك الأولي لا يلزمك بأي شيء.</span>
              </div>
            </div>
            <div className="form-panel">
              <div className="form-heading">
                <span className="form-index">IELTS / 01</span>
                <h3>احجز مقعدك وابدأ الآن</h3>
                <p>املأ بياناتك وسنتواصل معك قريبًا.</p>
              </div>
              <RegistrationForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner content-width">
          <BrandMark />
          <p>استعداد أوضح لاختبار IELTS، وخطوة أقرب إلى هدفك.</p>
          <a href="#home">العودة إلى الأعلى ↑</a>
          <span className="footer-legal">© {new Date().getFullYear()} مسارك. جميع الحقوق محفوظة.</span>
        </div>
      </footer>
    </>
  );
}
