async function newBenchmarkHandler(event) {
    event.preventDefault();
  
    const boulder_grade = document.querySelector('#boulder-grade').value.trim();
    const route_grade = document.querySelector('#route-grade').value.trim();
  
    const response = await fetch(`/api/benchmarks`, {
      method: 'POST',
      body: JSON.stringify({
        boulder_grade,
        route_grade
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
  
document.querySelector('#add-benchmark-form').addEventListener('submit', newBenchmarkHandler);