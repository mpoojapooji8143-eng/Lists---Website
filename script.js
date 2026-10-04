const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("mainNav");
const filterButtons = document.querySelectorAll(".filter-btn");
const destinationCards = document.querySelectorAll(".destination-card");
const destinationSearch = document.getElementById("destinationSearch");
const faqItems = document.querySelectorAll(".faq-item");
const itinerarySelect = document.getElementById("itinerarySelect");
const itineraryDetails = document.getElementById("itineraryDetails");
const checklistInputs = document.querySelectorAll(".checklist-list input");

const itineraryData = {
  bali: {
    title: "Bali Wellness Escape",
    length: "5 Days",
    days: [
      {
        day: "Day 1",
        title: "Arrival & Sunset Ritual",
        time: "09:00 AM",
        location: "Ubud",
        description: "Check into a jungle villa, unwind with a wellness welcome ritual, and enjoy a sunset dinner overlooking rice terraces."
      },
      {
        day: "Day 2",
        title: "Temple & Waterfall Tour",
        time: "08:30 AM",
        location: "Tegalalang",
        description: "Explore scenic temples, hidden waterfalls, and a local artisan market before a relaxed evening in Seminyak."
      },
      {
        day: "Day 3",
        title: "Beach & Surf Experience",
        time: "10:00 AM",
        location: "Canggu",
        description: "Enjoy a guided surf session, beach club time, and a fresh seafood lunch by the coastline."
      },
      {
        day: "Day 4",
        title: "Rice Terrace Walk",
        time: "07:30 AM",
        location: "Jatiluwih",
        description: "Take a scenic walk across UNESCO-listed fields and finish your afternoon with a traditional spa treatment."
      },
      {
        day: "Day 5",
        title: "Departure & Farewell Brunch",
        time: "11:00 AM",
        location: "Ubud Center",
        description: "Enjoy a farewell brunch with local flavors before heading to the airport with beautiful memories."
      }
    ]
  },
  swiss: {
    title: "Swiss Alpine Journey",
    length: "5 Days",
    days: [
      {
        day: "Day 1",
        title: "Lake Geneva Arrival",
        time: "09:00 AM",
        location: "Geneva",
        description: "Settle into a premium lakeside hotel and enjoy a curated evening stroll through the old town."
      },
      {
        day: "Day 2",
        title: "Scenic Rail to Interlaken",
        time: "08:00 AM",
        location: "Interlaken",
        description: "Take a panoramic train route through the Alps and enjoy the dramatic mountain views from the lodge."
      },
      {
        day: "Day 3",
        title: "Hiking & Cable Car",
        time: "07:30 AM",
        location: "Grindelwald",
        description: "Hike alpine trails, ride a cable car to a summit viewpoint, and enjoy a cozy mountain dinner."
      },
      {
        day: "Day 4",
        title: "Lake Cruise",
        time: "10:30 AM",
        location: "Lucerne",
        description: "Cruise across turquoise waters and visit lakeside cafés with postcard-perfect views."
      },
      {
        day: "Day 5",
        title: "Chocolate & Farewell Tour",
        time: "11:00 AM",
        location: "Zurich",
        description: "Tour artisan chocolatiers and enjoy a final gourmet brunch before departure."
      }
    ]
  },
  kyoto: {
    title: "Kyoto Culture Trail",
    length: "5 Days",
    days: [
      {
        day: "Day 1",
        title: "Old Town Welcome",
        time: "09:30 AM",
        location: "Gion",
        description: "Check in, wander lantern-lit streets, and enjoy a traditional tea ceremony in the evening."
      },
      {
        day: "Day 2",
        title: "Temple Circuit",
        time: "08:00 AM",
        location: "Higashiyama",
        description: "Visit iconic temples, quiet gardens, and scenic viewpoints across Kyoto’s historic district."
      },
      {
        day: "Day 3",
        title: "Arashiyama Bamboo Walk",
        time: "09:00 AM",
        location: "Arashiyama",
        description: "Walk through bamboo groves, see the riverfront and stop for local sweets and matcha."
      },
      {
        day: "Day 4",
        title: "Craft & Food Trail",
        time: "10:00 AM",
        location: "Nishiki Market",
        description: "Explore artisanal lanes, sample local cuisine, and shop for handcrafted keepsakes."
      },
      {
        day: "Day 5",
        title: "Zen Morning & Departure",
        time: "07:45 AM",
        location: "Kinkaku-ji",
        description: "End your trip with a serene garden visit and a reflective breakfast before heading to the station."
      }
    ]
  }
};

function renderItinerary(planKey) {
  const plan = itineraryData[planKey];

  itineraryDetails.innerHTML = `
    <div class="itinerary-title">
      <h3>${plan.title}</h3>
      <span class="trip-length">${plan.length}</span>
    </div>
    <ol class="itinerary-list">
      ${plan.days
        .map(
          (item) => `
            <li>
              <article class="day-card">
                <span>${item.day}</span>
                <h4>${item.title}</h4>
                <div class="day-meta">
                  <time>${item.time}</time>
                  <span>${item.location}</span>
                </div>
                <p>${item.description}</p>
              </article>
            </li>
          `
        )
        .join("")}
    </ol>
  `;
}

function toggleMenu() {
  const isOpen = mainNav.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function filterDestinations(category) {
  destinationCards.forEach((card) => {
    const matches = category === "all" || card.dataset.category === category;
    card.classList.toggle("hidden", !matches);
  });

  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === category;
    btn.classList.toggle("active", isActive);
  });
}

function handleSearch() {
  const query = destinationSearch.value.trim().toLowerCase();
  const selectedCategory = document.querySelector(".filter-btn.active")?.dataset.filter ?? "all";

  destinationCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const categoryMatch = selectedCategory === "all" || card.dataset.category === selectedCategory;
    const searchMatch = !query || title.includes(query);
    const isVisible = categoryMatch && searchMatch;
    card.classList.toggle("hidden", !isVisible);
  });
}

navToggle?.addEventListener("click", toggleMenu);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filterDestinations(category);
  });
});

destinationSearch?.addEventListener("input", handleSearch);

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button?.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

itinerarySelect?.addEventListener("change", (event) => {
  renderItinerary(event.target.value);
});

checklistInputs.forEach((input) => {
  input.addEventListener("change", () => {
    input.parentElement.classList.toggle("done", input.checked);
  });
});

document.querySelector(".search-panel")?.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch();
});

renderItinerary(itinerarySelect.value);
