export default function formatDate(dateString: string | undefined) {
  if (!dateString) {
    return;
  }

  const date = new Date(dateString);

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
