import trimLeadingSpaces from "./trimLeadingSpaces";

function trimInvalidSpaces(input: string) {
  if (input.trim() === "") {
    return "";
  } else {
    return trimLeadingSpaces(input);
  }
}

export default trimInvalidSpaces;
