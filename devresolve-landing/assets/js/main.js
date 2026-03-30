/* NovaAI Template Scripts
   - GSAP animations (hero, sections, stagger)
   - ScrollTrigger for section reveals
   - jQuery UI logic (pricing toggle, demo, button micro-interactions)
*/

(function ($) {
  "use strict";

	$(window).on("load", function() {
		ScrollTrigger.refresh();
	});
	// GSAP registration
	gsap.registerPlugin(ScrollTrigger);
	
	/*PRELOADER JS*/
	$(window).on("load", function () {
		$(".status").fadeOut();
		$(".preloader").delay(350).fadeOut("slow");
	});
	/*END PRELOADER JS*/
	
	// Back to top button 
	$(window).on('scroll', function () { 
		var scrolled = $(window).scrollTop();
		if (scrolled > 400) $('.back-to-top').addClass('active');
		if (scrolled < 400) $('.back-to-top').removeClass('active');
	});


	$('.back-to-top').on('click', function () {
		$("html, body").animate({
			scrollTop: "0"
		}, 50);
	});

	// Hero entrance animation
	gsap.set(".hero-title, .hero-subtitle, .hero .btn", { opacity: 0, y: 20 });
	gsap.set(".hero-mockup", { opacity: 0, y: 20, rotateX: 6, transformOrigin: "50% 100%" });

  const heroTL = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });
  heroTL
    .to(".hero-title", { opacity: 1, y: 0 }, 0.1)
    .to(".hero-subtitle", { opacity: 1, y: 0 }, 0.25)
    .to(".hero .btn", { opacity: 1, y: 0, stagger: 0.07 }, 0.4)
    .to(".hero-mockup", { opacity: 1, y: 0, rotateX: 0 }, 0.35);

  // Section fade/slide on scroll
  const revealSections = [
    ".usecases .section-header",
    ".usecases .usecase-card",
    ".how .section-header",
    ".how .step-card",
    ".features .section-header",
    ".features .feature-card",
    ".demo .section-header",
    ".demo .demo-wrap",
    ".integrations .section-header",
    ".integrations .logo-box",
    ".pricing .section-header",
    ".pricing .price-card",
    ".testimonials .section-header",
    ".testimonials .testimonial-card",
    ".faq .section-header",
    ".faq .accordion-item",
    ".final-cta .cta-wrap"
  ];

  revealSections.forEach((selector) => {
    gsap.from(selector, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: { each: 0.08, from: "start" },
      scrollTrigger: {
        trigger: selector,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Button hover micro-interaction using jQuery to trigger GSAP
  $(".btn-animate").on("mouseenter", function () {
    gsap.to(this, { y: -2, duration: 0.15, ease: "power2.out" });
  });
  $(".btn-animate").on("mouseleave", function () {
    gsap.to(this, { y: 0, duration: 0.2, ease: "power2.out" });
  });

  // Pricing monthly/yearly toggle
  $("#billingSwitch").on("change", function () {
    const yearly = $(this).is(":checked");
    $(".price-card .amount").each(function () {
      const $amt = $(this);
      const month = Number($amt.data("month"));
      const year = Number($amt.data("year"));
      const target = yearly ? year : month;

      gsap.to($amt, {
        textContent: target,
        duration: 0.25,
        snap: { textContent: 1 },
        ease: "power2.out",
        onUpdate: function () {
          // keep it integer; GSAP handles the text tween
        }
      });

      const $period = $amt.next(".period");
      if (yearly) {
        $period.text("/mo (billed yearly)");
      } else {
        $period.text("/mo");
      }
    });
  });

  // Live demo (UI only)
  const sampleOutput = (prompt) => {
    const clean = (prompt || "").trim();
    const title = clean ? clean.slice(0, 48) : "Product update: Introducing NovaAI features";
    return `
      <h6 style="margin-bottom:8px;">${title}</h6>
      <p>Hi team,</p>
      <p>We are excited to share our latest NovaAI improvements:</p>
      <ul>
        <li><strong>Smarter workflows:</strong> Faster draft generation with better accuracy.</li>
        <li><strong>New integrations:</strong> Slack, Jira, and Drive connectors.</li>
        <li><strong>Enhanced security:</strong> SSO, RBAC, and audit logging.</li>
      </ul>
      <p>Questions or feedback? Reply to this email or open a ticket in Support.</p>
      <p>— NovaAI</p>
    `;
  };

  $("#tryAI").on("click", function () {
    const prompt = $("#demoPrompt").val();
    const output = sampleOutput(prompt);
    const $preview = $("#previewOutput");

    gsap.to($preview, { opacity: 0, duration: 0.15, onComplete: function () {
      $preview.html(output);
      gsap.to($preview, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
    }});
  });

  $("#clearAI").on("click", function () {
    $("#demoPrompt").val("");
    const $preview = $("#previewOutput");
    gsap.to($preview, { opacity: 0, duration: 0.15, onComplete: function () {
      $preview.html('<p class="body_text">Your AI formatted output will appear here.</p>');
      gsap.to($preview, { opacity: 1, duration: 0.2 });
    }});
  });

  // Smooth focus ring for keyboard nav (accessibility micro-interaction)
  $(document).on("keyup", function (e) {
    if (e.key === "Tab") {
      $("body").addClass("show-focus");
    }
  });
  // Scroll ? ??? ??????
	gsap.to(".shape-circle", {
	  y: 80,
	  rotation: 180,
	  scrollTrigger: {
		trigger: ".features",
		start: "top bottom",
		scrub: true
	  }
	});

	gsap.to(".shape-triangle", {
	  x: -100,
	  rotation: -90,
	  scrollTrigger: {
		trigger: ".features",
		start: "top bottom",
		scrub: true
	  }
	});
	
	
	$(".feature-card").on("mouseenter", function(){
	  gsap.to($(this).find(".feature-shape"), {
		opacity: 0.25,
		scale: 1,
		duration: 0.6,
		ease: "power2.out"
	  });
	});

	$(".feature-card").on("mouseleave", function(){
	  gsap.to($(this).find(".feature-shape"), {
		opacity: 0,
		scale: 0.5,
		duration: 0.6,
		ease: "power2.in"
	  });
	});
	
	new Lenis({
		autoRaf: true
	});

})(jQuery);