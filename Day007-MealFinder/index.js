var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var api = {
    searchMeals: 'https://www.themealdb.com/api/json/v1/1/search.php',
    randomMeal: 'https://www.themealdb.com/api/json/v1/1/random.php',
    getMealById: 'https://www.themealdb.com/api/json/v1/1/lookup.php'
};
function request(url, key, value) {
    return __awaiter(this, void 0, void 0, function () {
        var finalUrl, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    finalUrl = key ? "".concat(url, "?").concat(key, "=").concat(value) : url;
                    console.log(finalUrl);
                    return [4 /*yield*/, fetch(finalUrl)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, (data && data.meals) ? data.meals : []];
            }
        });
    });
}
var searchInput = document.querySelector('.search'), searchBtn = document.querySelector('.search-btn'), randomBtn = document.querySelector('.random-btn'), headingEl = document.querySelector('.heading'), mealsEl = document.querySelector('.meals'), singleMealEl = document.querySelector('.single-meal');
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener('click', searchMeals);
randomBtn === null || randomBtn === void 0 ? void 0 : randomBtn.addEventListener('click', randomMeal);
mealsEl === null || mealsEl === void 0 ? void 0 : mealsEl.addEventListener('click', singleMeal);
function searchMeals(e) {
    return __awaiter(this, void 0, void 0, function () {
        var term, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    singleMealEl.innerHTML = '';
                    term = searchInput.value;
                    if (!term.trim()) return [3 /*break*/, 2];
                    return [4 /*yield*/, request(api.searchMeals, 's', term)];
                case 1:
                    data = _a.sent();
                    if (data.length === 0) {
                        headingEl.innerHTML = "<p>There are no search results. Try again!</p>";
                    }
                    else {
                        headingEl.innerHTML = "<h2>Search results for '".concat(term, "':</h2>");
                        mealsEl.innerHTML = "".concat(data.map(function (meal) { return "\n                <div class=\"meal\">\n                    <img src=".concat(meal.strMealThumb, " alt=").concat(meal.strMeal, ">\n                    <div class=\"meal-info\" data-meal-id=").concat(meal.idMeal, ">\n                        <h3>").concat(meal.strMeal, "</h3>\n                    </div>\n                </div>\n                "); }).join(''));
                    }
                    searchInput.value = '';
                    return [3 /*break*/, 3];
                case 2:
                    alert('Please enter a term');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function randomMeal() {
    return __awaiter(this, void 0, void 0, function () {
        var data, meal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mealsEl.innerHTML = '';
                    headingEl.innerHTML = '';
                    return [4 /*yield*/, request(api.randomMeal)];
                case 1:
                    data = _a.sent();
                    meal = data[0];
                    addMealToDom(meal);
                    return [2 /*return*/];
            }
        });
    });
}
function singleMeal(e) {
    return __awaiter(this, void 0, void 0, function () {
        var mealInfo, mealId, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mealInfo = e.path.find(function (ele) {
                        if (ele.classList) {
                            return ele.classList.contains('meal-info');
                        }
                        else {
                            return false;
                        }
                    });
                    if (!mealInfo) return [3 /*break*/, 2];
                    mealId = mealInfo.getAttribute("data-meal-id");
                    return [4 /*yield*/, request(api.getMealById, 'i', mealId)];
                case 1:
                    data = _a.sent();
                    addMealToDom(data[0]);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function addMealToDom(meal) {
    var tags = [];
    for (var i = 1; i < 20; i++) {
        if (meal["strIngredient".concat(i)]) {
            tags.push("".concat(meal["strIngredient".concat(i)], " - ").concat(meal["strMeasure".concat(i)]));
        }
    }
    singleMealEl.innerHTML = "\n        <h1>".concat(meal.strMeal, "</h1>\n        <img src=").concat(meal.strMealThumb, " alt=").concat(meal.strMeal, " >\n        <div class=\"main\">\n            <div class=\"titles\">\n                ").concat(meal.strCategory ? "<p>".concat(meal.strCategory, "</p>") : '', "\n                ").concat(meal.strArea ? "<p>".concat(meal.strArea, "</p>") : '', "\n            </div>\n            <p>").concat(meal.strInstructions, "</p>\n            <h2>Ingredients</h2>\n            <ul class=\"tags\">\n                ").concat(tags.map(function (tag) { return "<li>".concat(tag, "</li>"); }).join(''), "\n            </ul>\n        </div>\n    ");
}
