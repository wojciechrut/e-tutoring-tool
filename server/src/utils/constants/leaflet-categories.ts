export const leafletCategories = {
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

export const getSymmetricLookingFor = (
  lookingFor: typeof leafletCategories.lookingFor[number]
) => {
  return lookingFor === "teacher"
    ? "students"
    : lookingFor === "students"
    ? "teacher"
    : "study partner";
};
