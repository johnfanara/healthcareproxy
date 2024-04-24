export const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};