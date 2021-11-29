class Town {
  public nom: string;
  public population: number;
  public codesPostaux: string;
  public codeDepartement: string;
  constructor(aNom: string, aPop: number, aCodeP: string, aDpt: string) {
    this.nom = aNom;
    this.population = aPop;
    this.codesPostaux = aCodeP;
    this.codeDepartement = aDpt;
  }
}

type TownServe = {
  nom: string;
  population: number;
  codesPostaux: string;
  codeDepartement: string;
};

function getValues(town: string): Promise<Town[]> {
  return fetch("https://geo.api.gouv.fr/communes?nom=" + town).then(
    (res: Response) => {
      return res.json().then(function (data) {
        let tabTown: Town[] = [];
        for (const townServe of data as TownServe[]) {
          tabTown.push(
            new Town(
              townServe.nom,
              townServe.population,
              townServe.codesPostaux,
              townServe.codeDepartement
            )
          );
        }
        return tabTown;
      });
    }
  );
}

function displayCities(cities: Town[]) {
  let divResults = document.getElementById("results");
  let ul = document.createElement("ul") as HTMLUListElement;

  for (const town of cities) {
    let li = document.createElement("li") as HTMLLIElement;
    (li.innerHTML = town.nom + "<br>"),
      (li.innerHTML += " population : " + town.population + "<br>"),
      (li.innerHTML += " codes postaux : " + town.codesPostaux + "<br>"),
      (li.innerHTML += " département : " + town.codeDepartement);
    ul!.append(li);
  }
  divResults!.append(ul);
}

function init() {
  document
    .querySelector("#form")
    ?.addEventListener("submit", function (e: Event) {
      e.preventDefault();
      let inputValue = (document.querySelector("#cityName") as HTMLInputElement)
        .value;
      getValues(inputValue).then((getTown: Town[]) => {
        console.log(getTown);
        displayCities(getTown);
      });
    });
}

init();
