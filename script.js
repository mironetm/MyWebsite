/* Home gallery: only files from Images/ (MePhoto excluded) */
const ALL_IMAGES = [
  { file: "BllomPhoneMockup.png", title: "Bloom Phone Mockup" },
  { file: "stellarveil.jpg", title: "Motion Design" },
  { file: "graphicDesign.png", title: "Graphic Design" },
  { file: "Illustration1.png", title: "Illustration" },
  { file: "phonemockup.jpg", title: "Phone Mockup" },
  { file: "SurfIllustration.PNG", title: "Surf Illustration" },
];

// The columns will be generated dynamically based on screen width

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/feed/",
    target: "_blank",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M6.94 8.5v9.06H3.93V8.5h3.01zm.2-2.8c0 .93-.7 1.67-1.71 1.67h-.02c-.97 0-1.67-.74-1.67-1.67 0-.95.72-1.68 1.7-1.68s1.67.73 1.7 1.68zM20.08 12.36v5.2h-3v-4.85c0-1.21-.43-2.03-1.52-2.03-.83 0-1.33.56-1.55 1.1-.08.19-.1.45-.1.71v5.07h-3s.04-8.22 0-9.06h3v1.28c.4-.62 1.11-1.5 2.7-1.5 1.98 0 3.47 1.3 3.47 4.08z"/>
      </svg>
    `
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/irone_2311/?hl=en",
    target: "_blank",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M7.8 3h8.4C18.85 3 21 5.15 21 7.8v8.4c0 2.65-2.15 4.8-4.8 4.8H7.8C5.15 21 3 18.85 3 16.2V7.8C3 5.15 5.15 3 7.8 3zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8zm8.85 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8A2.7 2.7 0 1 0 12 14.7 2.7 2.7 0 0 0 12 9.3z"/>
      </svg>
    `
  },
  {
    label: "Email",
    href: "contact.html",
    target: "_self",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 2-8 5L4 7h16zm0 10H4V9l8 5 8-5v8z"/>
      </svg>
    `
  }
];

function buildCard({ file, title }) {
  const card = document.createElement("figure");
  card.className = "scroll-card";

  const isPdf = file.toLowerCase().endsWith(".pdf");
  const media = document.createElement(isPdf ? "embed" : "img");
  
  media.src = `Images/${file}`;
  
  if (isPdf) {
    media.type = "application/pdf";
    media.style.pointerEvents = "none";
    media.style.width = "100%";
    // Estimate standard A4/portrait aspect ratio for PDF so it takes up space correctly
    media.style.aspectRatio = "1 / 1.414";
  } else {
    media.alt = title;
    media.loading = "lazy";
  }

  card.appendChild(media);

  return card;
}

function buildGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.innerHTML = ''; // Clear existing content for resize

  const totalCols = 3;

  const baseSpeeds = [140, 110, 160];

  for (let i = 0; i < totalCols; i++) {
    // Alternate direction
    const direction = i % 2 === 0 ? "down" : "up";
    
    // Vary speed
    const speed = `${baseSpeeds[i % baseSpeeds.length]}s`;
    
    // Shuffle or shift images slightly per column to avoid repeating patterns
    let colImages = [...ALL_IMAGES];
    if (i % 3 === 1) {
      colImages = colImages.reverse();
    } else if (i % 3 === 2) {
      const shift = (i * 2) % ALL_IMAGES.length;
      colImages = [...ALL_IMAGES.slice(shift), ...ALL_IMAGES.slice(0, shift)];
    }

    const column = document.createElement("div");
    column.className = "scroll-column";

    const track = document.createElement("div");
    track.className = `scroll-track scroll-track--${direction}`;
    track.style.setProperty("--speed", speed);

    // Duplicate images for seamless infinite loop
    [...colImages, ...colImages].forEach((item) => {
      track.appendChild(buildCard(item));
    });

    column.appendChild(track);
    gallery.appendChild(column);
  }
}


function buildSocialIcons(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const wrapper = document.createElement("div");
  wrapper.className = "social-set";

  SOCIAL_LINKS.forEach((item) => {
    const link = document.createElement("a");
    link.className = "social-icon";
    link.href = item.href;
    if (item.target) {
      link.target = item.target;
    }
    link.setAttribute("aria-label", item.label);
    link.innerHTML = item.icon.trim();
    wrapper.appendChild(link);
  });

  container.appendChild(wrapper);
}

buildSocialIcons("headerSocials");
buildSocialIcons("floatingSocials");
buildSocialIcons("footerSocials");
buildGallery();

function setupMenuToggle() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("fullscreenMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !isExpanded);
    menu.setAttribute("aria-hidden", isExpanded);
  });
}

setupMenuToggle();

function setupImageLightbox() {
  const links = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (!links.length) return;

  let activeGroup = [];
  let activeIndex = 0;

  const lightbox = document.createElement("div");
  lightbox.className = "site-lightbox";
  lightbox.setAttribute("aria-hidden", "true");

  const closeBtn = document.createElement("button");
  closeBtn.className = "site-lightbox-close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close gallery");
  closeBtn.textContent = "×";

  const prevBtn = document.createElement("button");
  prevBtn.className = "site-lightbox-nav site-lightbox-nav--prev";
  prevBtn.type = "button";
  prevBtn.setAttribute("aria-label", "Previous image");
  prevBtn.textContent = "‹";

  const nextBtn = document.createElement("button");
  nextBtn.className = "site-lightbox-nav site-lightbox-nav--next";
  nextBtn.type = "button";
  nextBtn.setAttribute("aria-label", "Next image");
  nextBtn.textContent = "›";

  const media = document.createElement("img");
  media.className = "site-lightbox-media";
  media.alt = "";

  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);
  lightbox.appendChild(closeBtn);
  lightbox.appendChild(media);
  document.body.appendChild(lightbox);

  const openAt = (groupLinks, index) => {
    activeGroup = groupLinks;
    activeIndex = index;
    const current = activeGroup[activeIndex];
    media.src = current.href;
    media.alt = current.dataset.caption || current.querySelector("img")?.alt || "Gallery image";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    media.src = "";
    document.body.style.overflow = "";
  };

  const showNext = (direction) => {
    if (!activeGroup.length) return;
    activeIndex = (activeIndex + direction + activeGroup.length) % activeGroup.length;
    const current = activeGroup[activeIndex];
    media.src = current.href;
    media.alt = current.dataset.caption || current.querySelector("img")?.alt || "Gallery image";
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const index = links.indexOf(link);
      openAt(links, index);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    showNext(-1);
  });
  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    showNext(1);
  });
  media.addEventListener("click", (event) => {
    event.stopPropagation();
    showNext(1);
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") showNext(1);
    if (event.key === "ArrowLeft") showNext(-1);
  });

  lightbox.addEventListener(
    "wheel",
    (event) => {
      if (!lightbox.classList.contains("is-open")) return;
      event.preventDefault();
      if (event.deltaY > 0) showNext(1);
      else if (event.deltaY < 0) showNext(-1);
    },
    { passive: false }
  );
}

setupImageLightbox();

function setupMotionVideoHoverAudio() {
  const videoLinks = document.querySelectorAll(".project-motion-video-link");
  if (!videoLinks.length) return;

  videoLinks.forEach((link) => {
    const video = link.querySelector(".project-motion-video");
    if (!video) return;

    const enableAudio = () => {
      video.muted = false;
      video.play().catch(() => {
        // Some browsers still block unmuted autoplay until full interaction.
      });
    };

    const disableAudio = () => {
      video.muted = true;
      video.play().catch(() => {
        // Keep silent loop if browser paused it.
      });
    };

    link.addEventListener("mouseenter", enableAudio);
    link.addEventListener("mouseleave", disableAudio);
    link.addEventListener("focusin", enableAudio);
    link.addEventListener("focusout", (event) => {
      if (!link.contains(event.relatedTarget)) {
        disableAudio();
      }
    });
  });
}

setupMotionVideoHoverAudio();

function setupPortfolioScrollReveal() {
  const section = document.querySelector(".portfolio-editorial");
  if (!section) return;

  const rows = section.querySelectorAll(".project-row");
  const arrow = document.querySelector(".portfolio-arrow");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveal = (el) => {
    if (el) el.classList.add("is-revealed");
  };

  if (reduced) {
    rows.forEach((row) => reveal(row));
    reveal(arrow);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.08,
    }
  );

  rows.forEach((row) => {
    if (!row.classList.contains("is-revealed")) io.observe(row);
  });
  if (arrow && !arrow.classList.contains("is-revealed")) io.observe(arrow);
}

setupPortfolioScrollReveal();

// Fix for Safari BFCache freezing CSS animations when returning via back button
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    buildGallery();
    setupPortfolioScrollReveal();
  }
});
