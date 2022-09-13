export default (user = {}) => {
  const DEFAULT_VALUE = "Anonymous";

  if (!user) return DEFAULT_VALUE;
  const { first_name, last_name } = user;

  if (!first_name && !last_name) return "Anonymous";

  if (first_name && last_name) return `${first_name} ${last_name}`;

  return first_name ? first_name : last_name;
};
