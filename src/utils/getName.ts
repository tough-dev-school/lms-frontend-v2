const getName = (
  firstName: string | undefined,
  lastName: string | undefined,
) => {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
};

export default getName;
