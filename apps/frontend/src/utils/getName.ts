export const getName = ({
  firstName,
  lastName,
  randomName,
}: {
  firstName?: string;
  lastName?: string;
  randomName?: string | null;
}) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
  return fullName || randomName || 'No name';
};
