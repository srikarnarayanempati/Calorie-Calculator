 const suggestions = {
      gain: ["Peanut Butter Sandwich", "Bananas", "Whole Milk", "Rice with Chicken", "Oats with Honey", "Smoothies with nuts"],
      lose: ["Boiled Eggs", "Grilled Chicken", "Steamed Broccoli", "Oatmeal", "Greek Yogurt", "Apple Slices with Peanut Butter"],
      maintain: ["Brown Rice with Veggies", "Baked Fish", "Fruits", "Whole Wheat Toast", "Vegetable Soup", "Cottage Cheese"]
    };
    let macroChartInstance = null;

    document.getElementById('calorie-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const age = parseInt(document.getElementById('age').value);
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const height = parseFloat(document.getElementById('height').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const activity = parseFloat(document.getElementById('activity').value);
      const goal = document.querySelector('input[name="goal"]:checked').value;

      let bmr = (gender === 'male') ? (10 * weight + 6.25 * height - 5 * age + 5) : (10 * weight + 6.25 * height - 5 * age - 161);
      let maintain = Math.round(bmr * activity);
      let calorieTarget = goal === 'gain' ? maintain + 500 : goal === 'lose' ? maintain - 500 : maintain;
      document.getElementById('daily-calories').innerText = calorieTarget;

      const protein = Math.round((calorieTarget * 0.2) / 4);
      const carbs = Math.round((calorieTarget * 0.5) / 4);
      const fat = Math.round((calorieTarget * 0.3) / 9);
      document.getElementById('protein').innerText = protein;
      document.getElementById('carbs').innerText = carbs;
      document.getElementById('fat').innerText = fat;

      const ctx = document.getElementById('macroChart').getContext('2d');
      if (macroChartInstance) {
            macroChartInstance.destroy();
        }
        macroChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [{
            data: [protein, carbs, fat],
            backgroundColor: ['#4CAF50', '#2196F3', '#FF9800']
          }]
        }
      });

      const foodHTML = `
        <div>
          <h5>Suggested Foods (${goal.charAt(0).toUpperCase() + goal.slice(1)} Weight)</h5>
          <ul>
            ${suggestions[goal].map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
      document.getElementById('food-suggestions').innerHTML = foodHTML;
    });