/**
 * Created by 振华 on 2017/1/22.
 */
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

exports.getFortune = function () {
    var idx = Math.floor(Math.random()*fortunes.length);
    return fortunes[idx];
}