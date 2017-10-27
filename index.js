
const zoo = {
    cash: 4000,
    spend: function (amount) {
        if (this.cash < amount) {
            throw "Not enough money!";
        }
        this.cash -= amount;
        console.log(`Remaining funds: ${this.cash}`);
    }
};

const animal = {
    initIdentity: function(name, species) {
        this.name = name;
        this.species = species;
    },
    initMeters: function() {
        this.hunger = 50;
    },
    feed: function () {
        this.hunger = 100;
        console.log(`${this.name} (${this.species}) ate ${this.foodType} and looks full!`)
    }
};

const foodTypes = {
    GRASS: "grass",
    FRUIT_AND_NUTS: "fruits and nuts",
    LARGE_PREY: "large prey",
    SMALL_PREY: "small prey"
}

const herbivore = Object.create(animal);

herbivore.feedHerbivoreFood = function () {
    try {
        zoo.spend(200);
        this.feed();
    } catch (e) {
        console.log(e);
    }
};

const grassHerbivore = Object.create(herbivore);

grassHerbivore.init = function(name, species) {
    this.initIdentity(name, species);
    this.initMeters();
    this.foodType = foodTypes.GRASS;
};

const fruitAndNutsHerbivore = Object.create(herbivore);

fruitAndNutsHerbivore.init = function(name, species) {
    this.initIdentity(name, species);
    this.initMeters();
    this.foodType = foodTypes.FRUIT_AND_NUTS;
};

const carnivore = Object.create(animal);

carnivore.feedCarnivoreFood = function () {
    try {
        zoo.spend(500);
        this.feed();
    } catch (e) {
        console.log(e);
    }
};

const largePreyCarnivore = Object.create(carnivore);

largePreyCarnivore.init = function(name, species) {
    this.initIdentity(name, species);
    this.initMeters();
    this.foodType = foodTypes.LARGE_PREY;
};

const smallPreyCarnivore = Object.create(carnivore);

smallPreyCarnivore.init = function(name, species) {
    this.initIdentity(name, species);
    this.initMeters();
    this.foodType = foodTypes.SMALL_PREY;
};

const animalCreator = {
    createAnimal: function(name, speciesName, animalType) {
        const animal = Object.create(animalType);
        animal.init(name, speciesName);
        return animal;
    },
    createZebra: function (name) {
        return this.createAnimal(name, "Zebra", grassHerbivore);
    },
    createChinchilla: function (name) {
        return this.createAnimal(name, "Chinchilla", fruitAndNutsHerbivore);
    },
    createLion: function(name) {
        return this.createAnimal(name, "Lion", largePreyCarnivore);
    },
    createFerret: function(name) {
        return this.createAnimal(name, "Ferret", smallPreyCarnivore);
    }
}

const zebra = animalCreator.createZebra("Savannah");
zebra.feedHerbivoreFood();

const chinchilla = animalCreator.createChinchilla("Double");
chinchilla.feedHerbivoreFood();

const lion = animalCreator.createLion("Rory");
lion.feedCarnivoreFood();

const ferret = animalCreator.createFerret("Sentry");
ferret.feedCarnivoreFood();

