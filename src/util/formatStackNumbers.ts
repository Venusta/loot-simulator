export const formatStackNumbers = (number: number): { amount: string; colour: string } => {
  const suffix: string[] = ["", "K", "M", "B", "T", "Q"];
  const colours: string[] = ["yellow", "white", "green", "cyan", "orange", "pink"];
  let size = number.toString().length;

  let index = 0;

  if (size >= 6) {
    while (size >= 5) {
      size -= 3;
      index += 1;
    }
  }
  return { amount: `${number.toString().slice(0, size)}${suffix[index]}`, colour: colours[index] };
};
