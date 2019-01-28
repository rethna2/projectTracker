export function filterTasks(list, filters) {
  return list.filter(item => {
    if (filters.status !== '' && item.status !== filters.status) {
      return false;
    }
    if (filters.assignedTo !== '' && item.assignedTo !== filters.assignedTo) {
      return false;
    }
    return true;
  });
}
