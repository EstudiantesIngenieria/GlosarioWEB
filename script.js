document.querySelectorAll('.link').forEach(link => {
    link.innerHTML = '<div><span>' + link.textContent.trim().split('').join('</span><span>') + '</span></div>'
    link.querySelectorAll('span').forEach(s => s.innerHTML = s.textContent == ' ' ? '&nbsp;' : s.textContent)
    link.insertAdjacentHTML('beforeend', '<div><svg preserveAspectRatio="none" viewBox="0 0 192 5"><path d="M191.246 4H129C129 4 127.781 4.00674 127 4C114.767 3.89447 108.233 1 96 1C83.7669 1 77.2327 3.89447 65 4C64.219 4.00674 63 4 63 4H0.751923" /></svg></div>')
});






document.querySelectorAll(".button").forEach((button) => {
    let getVar = (variable) =>
      getComputedStyle(button).getPropertyValue(variable);
  
    button.addEventListener("click", (e) => {
      e.preventDefault();
  
      if (!button.classList.contains("active")) {
        button.classList.add("active");
  
        gsap.to(button, {
          keyframes: [
            {
              "--left-wing-first-x": "50%",
              "--left-wing-first-y": "100%",
              "--right-wing-second-x": "50%",
              "--right-wing-second-y": "100%",
              duration: 0.2,
              onComplete() {
                gsap.set(button, {
                  "--left-wing-first-y": "0%",
                  "--left-wing-second-x": "40%",
                  "--left-wing-second-y": "100%",
                  "--left-wing-third-x": "0%",
                  "--left-wing-third-y": "100%",
                  "--left-body-third-x": "40%",
                  "--right-wing-first-x": "50%",
                  "--right-wing-first-y": "0%",
                  "--right-wing-second-x": "60%",
                  "--right-wing-second-y": "100%",
                  "--right-wing-third-x": "100%",
                  "--right-wing-third-y": "100%",
                  "--right-body-third-x": "60%",
                });
              },
            },
            {
              "--left-wing-third-x": "20%",
              "--left-wing-third-y": "90%",
              "--left-wing-second-y": "90%",
              "--left-body-third-y": "90%",
              "--right-wing-third-x": "80%",
              "--right-wing-third-y": "90%",
              "--right-body-third-y": "90%",
              "--right-wing-second-y": "90%",
              duration: 0.2,
            },
            {
              "--rotate": "50deg",
              "--left-wing-third-y": "95%",
              "--left-wing-third-x": "27%",
              "--right-body-third-x": "45%",
              "--right-wing-second-x": "45%",
              "--right-wing-third-x": "60%",
              "--right-wing-third-y": "83%",
              duration: 0.25,
            },
            {
              "--rotate": "60deg",
              "--plane-x": "-8px",
              "--plane-y": "40px",
              duration: 0.2,
            },
            {
              "--rotate": "40deg",
              "--plane-x": "45px",
              "--plane-y": "-300px",
              "--plane-opacity": 0,
              duration: 0.375,
              onComplete() {
                setTimeout(() => {
                  button.removeAttribute("style");
                  gsap.fromTo(
                    button,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        button.classList.remove("active");
                      },
                    }
                  );
                }, 1800);
              },
            },
          ],
        });
  
        gsap.to(button, {
          keyframes: [
            {
              "--text-opacity": 0,
              "--border-radius": "0px",
              "--left-wing-background": getVar("--primary-dark"),
              "--right-wing-background": getVar("--primary-dark"),
              duration: 0.1,
            },
            {
              "--left-wing-background": getVar("--primary"),
              "--right-wing-background": getVar("--primary"),
              duration: 0.15,
            },
            {
              "--left-body-background": getVar("--primary-dark"),
              "--right-body-background": getVar("--primary-darkest"),
              duration: 0.25,
              delay: 0.1,
            },
            {
              "--trails-stroke": "171px",
              duration: 0.22,
              delay: 0.22,
            },
            {
              "--success-opacity": 1,
              "--success-x": "0px",
              duration: 0.2,
              delay: 0.15,
            },
            {
              "--success-stroke": "0px",
              duration: 0.15,
            },
          ],
        });
      }
    });
  });