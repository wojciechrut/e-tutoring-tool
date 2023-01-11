"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymmetricLookingFor = exports.leafletCategories = void 0;
exports.leafletCategories = {
    lookingFor: ["teacher", "students", "study partner"],
    subjects: [
        "Mathematics",
        "English",
        "Spanish",
        "Polish",
        "Physics",
        "Computer Science",
        "Biology",
        "Chemistry",
        "History",
    ],
    levels: ["Elementary school", "Middle school", "High school", "University"],
};
const getSymmetricLookingFor = (lookingFor) => {
    return lookingFor === "teacher"
        ? "students"
        : lookingFor === "students"
            ? "teacher"
            : "study partner";
};
exports.getSymmetricLookingFor = getSymmetricLookingFor;
