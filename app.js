function init() {
  let current = 0;
  let directionForward = true;
  const items = document.querySelectorAll(".card-slider .items .item");
  const nextBtn = document.querySelector(".card-slider .next");
  const preBtn = document.querySelector(".card-slider .prev");

  const getCurrentItem = () => {
    return items[current];
  };

  const getCard = (item) => {
    return item.querySelector(".card");
  };

  const getTitle = (item) => {
    return item.querySelector(".title span");
  };

  const setItem = () => {
    items.forEach((item, index) => {
      getTitle(item).innerHTML = getTitle(item).textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
      if (index == current) {
        return;
      }
      anime.set(getCard(item), {
        translateX: "100vw",
      });

      anime.set(getTitle(item).querySelectorAll(".letter"), {
        clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
      });
    });

    anime.set(items[current], {
      translateX: 0,
      opacity: 1,
    });
  };

  const animate = {
    in(item) {
      const card = getCard(item);
      const title = getTitle(item);

      const t1 = anime.timeline({
        duration: 1000,
        easing: "easeOutExpo",
      });

      t1.add({
        targets: card,
        translateX: directionForward ? ["100vw", 0] : ["-100vw", 0],
        rotate: [40, 0],
        opacity: 1,
      }).add(
        {
          targets: title.querySelectorAll(".letter"),
          clipPath: [
            "polygon(0 0,100% 0,100% 0,0 0)",
            "polygon(0 0,100% 0,100% 100%,0 100%)",
          ],
          translateY: directionForward ? ["1em", 0] : ["-1em", 0],
          delay: anime.stagger(40),
          opacity: [0, 1],
        },
        "-=1000"
      );
      return t1;
    },
    out(item) {
      const card = getCard(item);
      const title = getTitle(item);

      const t1 = anime.timeline({
        duration: 1000,
        easing: "cubicBezier(0.86,0,0.07,1)",
      });

      t1.add({
        targets: card,
        translateX: directionForward ? [0, "100vw"] : [0, "-100vw"],
        rotate: [0, -40],
        opacity: [1, 0],
      }).add(
        {
          targets: title.querySelectorAll(".letter"),
          clipPath: [
            "polygon(0 0,100% 0,100% 100%,0 100%)",
            "polygon(100% 0,100% 100%,100% 0,100% 100%)",
          ],
          translateY: directionForward ? [0, "-1em"] : [0, "1em"],
          delay: anime.stagger(80),
          opacity: [1, 0],
        },
        "-=1000"
      );
      return t1;
    },
  };

  function updateClass() {
    items.forEach((item, index) => {
      if (index == current) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });
  }

  function next() {
    if (!directionForward) {
      directionForward = !directionForward;
    }

    animate.out(items[current]);
    current = (current + 1) % items.length;
    setTimeout(function () {
      animate.in(items[current]);
    }, 500);
    updateClass();
  }

  function prev() {
    if (directionForward) {
      directionForward = !directionForward;
    }

    animate.out(items[current]);
    current = (current - 1 + items.length) % items.length;
    setTimeout(function () {
      animate.in(items[current]);
    }, 500);
    updateClass();
  }

  nextBtn.addEventListener("click", next);
  preBtn.addEventListener("click", prev);
  setItem();
}

document.addEventListener("DOMContentLoaded", init);
