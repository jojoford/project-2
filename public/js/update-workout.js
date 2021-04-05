async function editWorkoutHandler(event) {
    event.preventDefault();
    
    const date = document.querySelector('#date').value.trim();
    const category = document.querySelector('#category').value.trim();
    const time = document.querySelector('#time').value.trim();
    const level = document.querySelector('#level').value.trim();
    const description = document.querySelector('#description').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];        
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'PUT',
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
        console.log(response.ok)
        document.location.replace('/dashboard');
      }
    }
    
  document.querySelector('#update-workout-form').addEventListener('submit', editWorkoutHandler);