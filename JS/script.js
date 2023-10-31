document.addEventListener("DOMContentLoaded", main);

async function main() {
  const bodies = await getBodies();
  console.log(bodies);

  document.querySelectorAll(".planet").forEach((planet) => {
    planet.addEventListener("click", function () {
      const planetName = this.getAttribute("data-name");
      showPlanetData(planetName, bodies);
    });
  });
}

function showPlanetData(planetName, bodies) {
  const planetElement = document.querySelector(`[data-name="${planetName}"]`);
  let infoElement = planetElement.querySelector(".planet-info");

  if (!infoElement) {
    infoElement = document.createElement("div");
    infoElement.classList.add("planet-info");
    planetElement.appendChild(infoElement);
  } else {
    infoElement.remove();
    return;
  }

  const planetData = bodies.find((planet) => planet.name === planetName);
  if (planetData) {
    infoElement.textContent = `Details for ${planetName}: ${JSON.stringify(
      planetData
    )}`;
  } else {
    infoElement.textContent = `No data found for ${planetName}`;
  }
}

async function getBodies() {
  try {
    const response = await fetch(
      "https://majazocom.github.io/Data/solaris.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Raw Response:", data);
    return data; // Directly return the fetched data
  } catch (error) {
    console.error("Error fetching bodies:", error);
    return [];
  }
}
