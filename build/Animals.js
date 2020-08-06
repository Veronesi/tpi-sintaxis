"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animals = void 0;
var Mammals;
(function (Mammals) {
    Mammals["Humans"] = "Humans";
    Mammals["Bats"] = "Bats";
    Mammals["Dolphins"] = "Dolphins";
})(Mammals || (Mammals = {}));
var Reptiles;
(function (Reptiles) {
    Reptiles["Snakes"] = "Snakes";
    Reptiles["Alligators"] = "Alligators";
    Reptiles["Lizards"] = "Lizards";
})(Reptiles || (Reptiles = {}));
exports.Animals = { ...Mammals, ...Reptiles };
