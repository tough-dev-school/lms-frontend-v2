export const getName = ({
  firstName,
  lastName,
  randomName,
}: {
  firstName?: string | null;
  lastName?: string | null;
  randomName?: string | null;
}) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
  return fullName || randomName || '';
};
