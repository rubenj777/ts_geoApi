class Town {
  public nom: string;
  public population: number;
  public code: number;
  constructor(aNom: string, aPop: number, aCode: number) {
    this.nom = aNom;
    this.population = aPop;
    this.code = aCode;
  }
}

type TownServe = {
  nom: string;
  population: number;
  code: number;
};

function getValues(town: string): Promise<Town[]> {
  return fetch("https://geo.api.gouv.fr/communes?nom=" + town).then(
    (res: Response) => {
      return res.json().then(function (data) {
        let tabTown: Town[] = [];
        for (const townServe of data as TownServe[]) {
          tabTown.push(
            new Town(townServe.nom, townServe.population, townServe.code)
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
    li.innerText = town.nom;
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
