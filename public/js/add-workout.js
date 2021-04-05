async function newWorkoutHandler(event) {
    event.preventDefault();
  
    const date = document.querySelector('#date').value.trim();
    const category = document.querySelector('#category').value.trim();
    const time = document.querySelector('#time').value.trim();
    const level = document.querySelector('#level').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    const response = await fetch(`/api/workouts`, {
      method: 'POST',
      body: JSON.stringify({
        date,
        category,
        time,
        level,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
    console.log('success');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('#add-session-form').addEventListener('submit', newWorkoutHandler);
