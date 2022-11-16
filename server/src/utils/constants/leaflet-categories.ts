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

export const getSymetricLookingFor = (
  lookingFor: typeof leafletCategories.lookingFor[number]
) => {
  return lookingFor === "teacher"
    ? "student"
    : lookingFor === "student"
    ? "teacher"
    : "study partner";
};
